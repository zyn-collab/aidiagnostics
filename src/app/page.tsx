import Link from 'next/link'
import { Disclaimer } from '@/components/common/Disclaimer'
import { InputIconGroup } from '@/components/models/InputIcons'
import { getActiveModels, getHospitalModels, getComingSoonModels } from '@/lib/models'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  const activeModels = getActiveModels()
  const hospitalModels = getHospitalModels()
  const comingSoonModels = getComingSoonModels()

  return (
    <div className="max-w-[960px] mx-auto px-6">
      {/* ── Header ───────────────────────────── */}
      <header className="pt-12 pb-8 border-b border-[var(--color-border)]">
        <p className="text-sm font-medium text-[var(--color-primary-dark)] mb-2">Public Policy Lab, Maldives</p>
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-3">
          Open Medical AI Diagnostics Platform
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Upload standard medical imaging files (DICOM, PNG, JPEG) and run peer-reviewed, open-source AI diagnostic models against them. Results are delivered as a PDF to the email address you provide. This platform is free to use. Policy Lab does not see, store, or have access to your files or results.
        </p>
        <p className="mt-3 text-sm text-[var(--color-warning)] font-medium">
          Research and educational use only. Not a medical device. Not cleared by any regulatory body.
        </p>
      </header>

      {/* ── Available Models (Tier A) ────────── */}
      <section className="py-8 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">Available for analysis</h2>
        <p className="text-[var(--color-text-secondary)] mb-5">
          Upload a file and receive results by email. CPU models run instantly with no limits. GPU models are subject to daily compute limits.
        </p>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-[var(--color-border)]">
                <th className="py-2.5 pr-4 font-semibold text-[var(--color-text)]">Model</th>
                <th className="py-2.5 pr-4 font-semibold text-[var(--color-text)]">Input</th>
                <th className="py-2.5 pr-4 font-semibold text-[var(--color-text)] hidden md:table-cell">What it does</th>
                <th className="py-2.5 pr-4 font-semibold text-[var(--color-text)]">Speed</th>
                <th className="py-2.5 font-semibold text-[var(--color-text)]"></th>
              </tr>
            </thead>
            <tbody>
              {activeModels.map((model) => (
                <tr key={model.slug} className="border-b border-[var(--color-border)]/60 hover:bg-[var(--color-bg-subtle)] transition-colors">
                  <td className="py-3.5 pr-4">
                    <Link href={`/models/${model.slug}`} className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary-dark)]">
                      {model.name}
                    </Link>
                  </td>
                  <td className="py-3.5 pr-4">
                    <InputIconGroup icons={model.inputIcons} />
                  </td>
                  <td className="py-3.5 pr-4 text-[var(--color-text-secondary)] hidden md:table-cell">
                    {model.tagline}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span className={model.computeType === 'cpu' ? 'text-[var(--color-primary-dark)] font-medium' : 'text-[var(--color-text-secondary)]'}>
                      {model.computeType === 'cpu' ? 'Instant' : model.estimatedTime}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <Link
                      href={`/analyze/${model.slug}`}
                      className="inline-flex items-center gap-1 font-medium text-[var(--color-primary-dark)] hover:underline whitespace-nowrap"
                    >
                      Analyze <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Hospital Integration (Tier B) ────── */}
      <section className="py-8 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">Requires hospital integration</h2>
        <p className="text-[var(--color-text-secondary)] mb-5">
          These models produce interactive outputs (3D volumes, real-time segmentation) that cannot be delivered as a PDF. They need to run on hospital radiology workstations. The software is free and open-source — contact us for setup help.
        </p>

        {hospitalModels.map((model) => (
          <div key={model.slug} className="py-3.5 border-b border-[var(--color-border)]/60">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Link href={`/models/${model.slug}`} className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary-dark)]">
                    {model.name}
                  </Link>
                  <InputIconGroup icons={model.inputIcons} />
                </div>
                <p className="text-[var(--color-text-secondary)]">{model.tagline}. {model.description}</p>
              </div>
              <Link href={`/models/${model.slug}`} className="font-medium text-[var(--color-primary-dark)] hover:underline shrink-0">
                Details
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ── Coming Soon (Tier C) ─────────────── */}
      <section className="py-8 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">Pending equipment</h2>
        {comingSoonModels.map((model) => (
          <div key={model.slug} className="mt-3">
            <div className="flex items-center gap-2 mb-1">
              <Link href={`/models/${model.slug}`} className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary-dark)]">{model.name}</Link>
              <InputIconGroup icons={model.inputIcons} />
            </div>
            <p className="text-[var(--color-text-secondary)]">
              {model.tagline}. {model.whyNotAvailable}
              {' '}<Link href={`/models/${model.slug}`} className="text-[var(--color-primary-dark)] hover:underline">Full details.</Link>
            </p>
          </div>
        ))}
      </section>

      {/* ── How it works ─────────────────────── */}
      <section className="py-8 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">How it works</h2>
        <div className="space-y-3 text-[var(--color-text-secondary)]">
          <p><strong className="text-[var(--color-text)]">1. Choose a model</strong> from the table above and click &ldquo;Analyze.&rdquo; Each model page lists the exact file format, input requirements, and what the model detects.</p>
          <p><strong className="text-[var(--color-text)]">2. Enter your email and upload your file.</strong> The file is encrypted in your browser using AES-256-GCM before upload. The unencrypted file never leaves your device.</p>
          <p><strong className="text-[var(--color-text)]">3. The AI model processes your file</strong> on a secure GPU (or CPU for X-ray and retinal models). DICOM metadata containing patient information is stripped automatically before inference.</p>
          <p><strong className="text-[var(--color-text)]">4. Results are emailed</strong> as a PDF report to the address you provided. The download link expires in 24 hours. All files are permanently deleted.</p>
        </div>
      </section>

      {/* ── Privacy ──────────────────────────── */}
      <section className="py-8 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Privacy</h2>
        <div className="text-[var(--color-text-secondary)] space-y-3">
          <p>
            Files are encrypted client-side (AES-256-GCM, Web Crypto API) before upload. The encryption key is generated per-upload in your browser. Encrypted files are stored temporarily in S3 with a 24-hour lifecycle policy. The inference worker decrypts in memory, strips DICOM PHI, runs the model, and discards everything.
          </p>
          <p>
            <strong className="text-[var(--color-text)]">Policy Lab can see:</strong> aggregate usage counts, processing times, error rates.{' '}
            <strong className="text-[var(--color-text)]">Policy Lab cannot see:</strong> uploaded files, results, email addresses (hashed only for rate-limiting), or any patient data.
          </p>
          <p><Link href="/privacy" className="text-[var(--color-primary-dark)] hover:underline">Full privacy policy &rarr;</Link></p>
        </div>
      </section>

      {/* ── About these models ───────────────── */}
      <section className="py-8 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">About these models</h2>
        <div className="text-[var(--color-text-secondary)] space-y-3">
          <p>
            The AI models on this platform are not large language models. They are specialized machine learning algorithms, each trained on hundreds of thousands to millions of real medical images for a specific diagnostic task. They output quantitative scores (probabilities, risk percentages, severity grades), not generated text. They have been validated in peer-reviewed clinical studies published in <em>Cell</em>, <em>Nature Communications</em>, the <em>Journal of Clinical Oncology</em>, <em>Science Translational Medicine</em>, <em>JAMA</em>, and <em>Radiology: AI</em>.
          </p>
          <p>
            All models are open-source. This platform exists to demonstrate what Maldivian hospitals can do with equipment they already own. The long-term goal is for hospitals to run these models directly on their own infrastructure.
          </p>
        </div>
      </section>

      {/* ── Compute & limits ─────────────────── */}
      <section className="py-8 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-bold text-[var(--color-text)] mb-4">Compute costs and limits</h2>
        <div className="text-[var(--color-text-secondary)] space-y-3">
          <p>
            Policy Lab covers all computation costs. CPU models (CheXpert, DR Screening) run on standard servers at negligible cost — no usage limits. GPU models (Pillar-0, Sybil, Mirai) run on RunPod Serverless, capped at ~$3/day in compute spend (~15–30 analyses/day depending on model mix).
          </p>
          <p>
            If the daily GPU budget is exhausted, new GPU jobs are queued and processed when budget resets. You will be notified by email when your results are ready.
          </p>
        </div>
      </section>

      {/* ── Footer matter ────────────────────── */}
      <section className="py-8">
        <Disclaimer />
        <p className="mt-6 text-[var(--color-text-secondary)]">
          Operated by the <a href="https://new.policylabmv.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary-dark)] hover:underline">Public Policy Lab, Maldives</a>.
          Contact: info@policylabmv.com.{' '}
          <Link href="/about" className="text-[var(--color-primary-dark)] hover:underline">About this project.</Link>{' '}
          <Link href="/faq" className="text-[var(--color-primary-dark)] hover:underline">FAQ.</Link>
        </p>
      </section>
    </div>
  )
}
