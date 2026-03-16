'use client'

import { useState, useCallback, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getModelBySlug } from '@/lib/models'
import { generateKey, encryptFile, exportKey, ivToBase64 } from '@/lib/encryption'
import { getPresignedUrl, uploadEncryptedFile, submitJob } from '@/lib/upload'
import { getJobStatus } from '@/lib/api'
import { Disclaimer } from '@/components/common/Disclaimer'
import {
  ArrowLeft, Upload, Mail, Shield, CheckCircle2, Loader2,
  Lock, Cloud, Cpu, FileCheck, AlertCircle, FileUp
} from 'lucide-react'

type Step = 'info' | 'email' | 'upload' | 'processing' | 'complete'

type ProcessingSubStep = 'encrypting' | 'uploading' | 'processing' | 'generating'

export default function AnalyzePage() {
  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const model = getModelBySlug(slug)

  const [step, setStep] = useState<Step>('info')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [processingSubStep, setProcessingSubStep] = useState<ProcessingSubStep>('encrypting')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)

  // Redirect if model doesn't exist or isn't active
  if (!model || model.tier !== 'active') {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-4">Model not available</h1>
        <p className="text-[var(--color-text-secondary)] mb-6">This model is not available for direct analysis.</p>
        <Link href="/models" className="text-[var(--color-primary-dark)] font-semibold hover:underline">
          Browse all models &rarr;
        </Link>
      </div>
    )
  }

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const isAcceptedFile = useCallback((f: File) => {
    const ext = '.' + f.name.split('.').pop()?.toLowerCase()
    return model.acceptedExtensions.includes(ext)
  }, [model.acceptedExtensions])

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isAcceptedFile(droppedFile)) {
      setFile(droppedFile)
      setError(null)
    } else {
      setError(`Invalid file format. Accepted: ${model.acceptedExtensions.join(', ')}`)
    }
  }, [isAcceptedFile, model.acceptedExtensions])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected && isAcceptedFile(selected)) {
      setFile(selected)
      setError(null)
    } else if (selected) {
      setError(`Invalid file format. Accepted: ${model.acceptedExtensions.join(', ')}`)
    }
  }, [isAcceptedFile, model.acceptedExtensions])

  const startProcessing = async () => {
    if (!file) return
    setStep('processing')
    setError(null)

    try {
      // Step 1: Encrypt
      setProcessingSubStep('encrypting')
      const key = await generateKey()
      const { blob, iv } = await encryptFile(file, key)
      const keyBase64 = await exportKey(key)
      const ivBase64 = ivToBase64(iv)

      // Step 2: Get presigned URL and upload
      setProcessingSubStep('uploading')
      const { uploadUrl, jobId: newJobId } = await getPresignedUrl(model.slug)
      setJobId(newJobId)
      await uploadEncryptedFile(uploadUrl, blob, setUploadProgress)

      // Step 3: Submit job
      setProcessingSubStep('processing')
      await submitJob({
        jobId: newJobId,
        modelSlug: model.slug,
        email,
        encryptedKey: keyBase64,
        iv: ivBase64,
      })

      // Step 4: Poll for completion
      setProcessingSubStep('generating')
      let status = await getJobStatus(newJobId)
      while (status.status === 'processing' || status.status === 'queued') {
        await new Promise((r) => setTimeout(r, 3000))
        status = await getJobStatus(newJobId)
      }

      if (status.status === 'error') {
        throw new Error(status.error || 'Processing failed')
      }

      setStep('complete')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setStep('upload')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <>
      {/* Header bar */}
      <div className="bg-[var(--color-hero-bg)] py-8">
        <div className="max-w-[800px] mx-auto px-6">
          <Link href={`/models/${model.slug}`} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to {model.name}
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Analyze with {model.name}
          </h1>
          <p className="text-gray-400 mt-1">{model.tagline}</p>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 py-10">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-10">
          {(['info', 'email', 'upload', 'processing', 'complete'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === s ? 'bg-[var(--color-primary)] text-white' :
                (['info', 'email', 'upload', 'processing', 'complete'].indexOf(step) > i)
                  ? 'bg-[var(--color-primary)]/20 text-[var(--color-primary-dark)]'
                  : 'bg-[var(--color-bg-subtle)] text-[var(--color-text-secondary)]'
              }`}>
                {(['info', 'email', 'upload', 'processing', 'complete'].indexOf(step) > i)
                  ? <CheckCircle2 className="w-4 h-4" />
                  : i + 1
                }
              </div>
              {i < 4 && <div className={`w-8 h-0.5 ${(['info', 'email', 'upload', 'processing', 'complete'].indexOf(step) > i) ? 'bg-[var(--color-primary)]/40' : 'bg-[var(--color-border)]'}`} />}
            </div>
          ))}
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* ── Step 1: Info ─────────────────── */}
        {step === 'info' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Before you begin</h2>
              <p className="text-[var(--color-text-secondary)]">
                Make sure you have the right file ready for {model.name}.
              </p>
            </div>

            <div className="bg-[var(--color-bg-subtle)] rounded-xl border border-[var(--color-border)] p-6 space-y-4">
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">Required input</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{model.inputDescription}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">Accepted formats</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{model.acceptedExtensions.join(', ')}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">Max file size</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{model.maxFileSizeMB} MB</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">Processing time</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{model.estimatedTime}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-[var(--color-hero-bg)] rounded-xl p-5">
              <Shield className="w-5 h-5 text-[var(--color-primary)] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-400">
                Your file will be encrypted in your browser before upload. Policy Lab cannot see your file or results. Everything is deleted within 24 hours.
              </p>
            </div>

            <button
              onClick={() => setStep('email')}
              className="w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* ── Step 2: Email ────────────────── */}
        {step === 'email' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Where should we send results?</h2>
              <p className="text-[var(--color-text-secondary)]">
                Results will be emailed as a PDF report to this address.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@hospital.mv"
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-[var(--color-border)] bg-white text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)]"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <span className="text-sm text-[var(--color-text-secondary)]">
                I understand that this is for research purposes only and does not constitute medical advice. Results must be reviewed by a qualified healthcare professional.
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('info')}
                className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-semibold hover:bg-[var(--color-bg-subtle)] transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep('upload')}
                disabled={!isValidEmail || !consent}
                className="flex-1 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Upload ───────────────── */}
        {step === 'upload' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Upload your file</h2>
              <p className="text-[var(--color-text-secondary)]">
                {model.inputDescription}. Accepted: {model.acceptedExtensions.join(', ')}
              </p>
            </div>

            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
                dragOver
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                  : file
                    ? 'border-[var(--color-primary)]/40 bg-[var(--color-primary)]/5'
                    : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/40'
              }`}
            >
              {file ? (
                <div className="space-y-2">
                  <FileCheck className="w-10 h-10 text-[var(--color-primary)] mx-auto" />
                  <p className="font-semibold text-[var(--color-text)]">{file.name}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{formatFileSize(file.size)}</p>
                  <button
                    onClick={() => setFile(null)}
                    className="text-sm text-[var(--color-primary-dark)] hover:underline"
                  >
                    Choose a different file
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <FileUp className="w-10 h-10 text-[var(--color-text-secondary)] mx-auto" />
                  <p className="text-[var(--color-text-secondary)]">
                    Drag and drop your file here, or{' '}
                    <label className="text-[var(--color-primary-dark)] font-semibold cursor-pointer hover:underline">
                      browse
                      <input
                        type="file"
                        accept={model.acceptedExtensions.join(',')}
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Max {model.maxFileSizeMB} MB &middot; {model.acceptedExtensions.join(', ')}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('email')}
                className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-semibold hover:bg-[var(--color-bg-subtle)] transition-colors"
              >
                Back
              </button>
              <button
                onClick={startProcessing}
                disabled={!file}
                className="flex-1 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Encrypt &amp; analyze
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Processing ───────────── */}
        {step === 'processing' && (
          <div className="space-y-8 text-center py-8">
            <Loader2 className="w-12 h-12 text-[var(--color-primary)] mx-auto animate-spin" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-2">Analyzing your file</h2>
              <p className="text-[var(--color-text-secondary)]">
                Results will be emailed to <strong className="text-[var(--color-text)]">{email}</strong>
              </p>
            </div>

            {/* Sub-steps */}
            <div className="max-w-sm mx-auto space-y-3 text-left">
              {([
                { key: 'encrypting', icon: Lock, label: 'Encrypting your file' },
                { key: 'uploading', icon: Cloud, label: 'Uploading securely' },
                { key: 'processing', icon: Cpu, label: 'Running AI model' },
                { key: 'generating', icon: FileCheck, label: 'Generating report' },
              ] as const).map((sub) => {
                const SubIcon = sub.icon
                const isCurrent = processingSubStep === sub.key
                const isDone = ['encrypting', 'uploading', 'processing', 'generating'].indexOf(processingSubStep) >
                  ['encrypting', 'uploading', 'processing', 'generating'].indexOf(sub.key)

                return (
                  <div key={sub.key} className={`flex items-center gap-3 p-3 rounded-lg ${isCurrent ? 'bg-[var(--color-primary)]/5' : ''}`}>
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)]" />
                    ) : isCurrent ? (
                      <Loader2 className="w-5 h-5 text-[var(--color-primary)] animate-spin" />
                    ) : (
                      <SubIcon className="w-5 h-5 text-[var(--color-text-secondary)]/40" />
                    )}
                    <span className={`text-sm ${isCurrent ? 'font-semibold text-[var(--color-text)]' : isDone ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-secondary)]/40'}`}>
                      {sub.label}
                      {isCurrent && processingSubStep === 'uploading' && uploadProgress > 0 && (
                        <span className="ml-2 text-[var(--color-primary)]">{uploadProgress}%</span>
                      )}
                    </span>
                  </div>
                )
              })}
            </div>

            <p className="text-sm text-[var(--color-text-secondary)]">
              You can close this page — we&apos;ll email your results when they&apos;re ready.
            </p>
          </div>
        )}

        {/* ── Step 5: Complete ─────────────── */}
        {step === 'complete' && (
          <div className="space-y-6 text-center py-8">
            <CheckCircle2 className="w-16 h-16 text-[var(--color-primary)] mx-auto" />
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">Analysis complete</h2>
              <p className="text-[var(--color-text-secondary)]">
                Results have been sent to <strong className="text-[var(--color-text)]">{email}</strong>
              </p>
            </div>

            <div className="bg-[var(--color-bg-subtle)] rounded-xl border border-[var(--color-border)] p-6 text-left max-w-md mx-auto">
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Check your email (including spam folder) for your report. The download link expires in 24 hours. Share your results with a qualified healthcare professional for interpretation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setStep('info')
                  setFile(null)
                  setEmail('')
                  setConsent(false)
                  setError(null)
                  setJobId(null)
                  setUploadProgress(0)
                }}
                className="px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Run another analysis
              </button>
              <Link
                href="/models"
                className="px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-semibold hover:bg-[var(--color-bg-subtle)] transition-colors text-center"
              >
                Browse models
              </Link>
            </div>

            <Disclaimer />
          </div>
        )}
      </div>
    </>
  )
}
