import { SectionLabel } from '@/components/layout/SectionLabel'
import { Shield, Lock, Trash2, Eye, Server, BarChart3 } from 'lucide-react'

export const metadata = {
  title: 'Privacy — AIMED',
  description: 'How AIMED protects your data. Files are encrypted before they leave your browser. Policy Lab never sees your uploads or results.',
}

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-[var(--color-hero-bg)] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>Privacy</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Your files are encrypted before they leave your browser. Policy Lab cannot see your uploads or results.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-3xl space-y-12">
          {/* Core promise */}
          <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-[var(--color-primary)] shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text)] mb-3">Our privacy promise</h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  Your files are encrypted before they leave your browser. They are processed directly by the AI model on a secure GPU and the results are sent only to the email address you provide. Policy Lab staff cannot see, access, or retrieve your uploads or results at any point. All files are permanently deleted within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* How it works step by step */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">How your data is handled</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text)] mb-1">1. Client-side encryption</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    When you upload a file, your browser generates a unique AES-256 encryption key and encrypts the file before it leaves your device. The unencrypted file never touches our servers.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <Server className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text)] mb-1">2. Encrypted storage</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    The encrypted file is uploaded to a secure cloud storage bucket with a 1-hour expiry. Even if someone accessed the storage directly, they would see only encrypted data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text)] mb-1">3. Ephemeral processing</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    A secure GPU worker downloads the encrypted file, decrypts it in memory, strips any patient identifying information from DICOM metadata, runs the AI model, generates the result report, and then discards all data. The decrypted file exists only in memory during processing.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                  <Trash2 className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-text)] mb-1">4. Automatic deletion</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    All files in cloud storage are automatically and permanently deleted within 24 hours. Result download links expire after 24 hours. There is no archive, no backup, no way to recover deleted files.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* What we can and cannot see */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">What Policy Lab can and cannot see</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-[var(--color-border)] p-6">
                <h3 className="font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
                  What we can see (aggregate only)
                </h3>
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <li className="flex items-start gap-2"><span className="text-[var(--color-primary)]">&bull;</span> Number of analyses run per model per day</li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-primary)]">&bull;</span> File format distribution</li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-primary)]">&bull;</span> Processing times</li>
                  <li className="flex items-start gap-2"><span className="text-[var(--color-primary)]">&bull;</span> Error rates (without file contents)</li>
                </ul>
              </div>

              <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
                <h3 className="font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-red-500" />
                  What we cannot see
                </h3>
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <li className="flex items-start gap-2"><span className="text-red-400">&bull;</span> Uploaded files or their contents</li>
                  <li className="flex items-start gap-2"><span className="text-red-400">&bull;</span> Analysis results</li>
                  <li className="flex items-start gap-2"><span className="text-red-400">&bull;</span> Email addresses (hashed for rate-limiting only)</li>
                  <li className="flex items-start gap-2"><span className="text-red-400">&bull;</span> Any patient information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Email */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">Email addresses</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              The email address you provide is used solely to deliver your results. We store a cryptographic hash (not the actual address) for rate-limiting purposes only. We do not send marketing emails, share your email with third parties, or use it for any purpose other than delivering the specific results you requested.
            </p>
          </section>

          {/* DICOM anonymization */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">DICOM anonymization</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Medical imaging files (DICOM format) can contain patient identifying information in their metadata — names, dates of birth, hospital IDs. Our processing pipeline automatically strips all patient identifying information from DICOM files before running the AI model. This happens inside the secure processing environment after decryption and before any analysis.
            </p>
          </section>

          {/* Technical details */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">Technical details</h2>
            <div className="bg-[var(--color-bg-subtle)] rounded-xl p-6 border border-[var(--color-border)]">
              <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                <li><strong className="text-[var(--color-text)]">Encryption:</strong> AES-256-GCM via Web Crypto API (browser-native)</li>
                <li><strong className="text-[var(--color-text)]">Key generation:</strong> Random per-upload, generated client-side</li>
                <li><strong className="text-[var(--color-text)]">Storage:</strong> Encrypted objects in AWS S3 with 24-hour lifecycle policy</li>
                <li><strong className="text-[var(--color-text)]">Processing:</strong> Isolated GPU containers on RunPod Serverless</li>
                <li><strong className="text-[var(--color-text)]">Email delivery:</strong> AWS SES with SPF/DKIM on policylabmv.com domain</li>
                <li><strong className="text-[var(--color-text)]">Logging:</strong> Aggregate metrics only — no file contents, results, or PII</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">Questions?</h2>
            <p className="text-[var(--color-text-secondary)]">
              If you have questions about our privacy practices, contact us at{' '}
              <strong className="text-[var(--color-text)]">info@policylabmv.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
