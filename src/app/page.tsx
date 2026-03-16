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
    <div className="max-w-[960px] mx-auto px-6 pb-12">
      {/* ── Page header ──────────────────────── */}
      <header className="pt-10 pb-7">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-primary-dark)] mb-2">Public Policy Lab, Maldives</p>
        <h1 className="text-[26px] font-bold leading-tight text-[var(--color-text)] mb-3">
          Open Medical AI Diagnostics Platform
        </h1>
        <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-[680px]">
          Upload standard medical imaging files (DICOM, PNG, JPEG) and run peer-reviewed, open-source AI diagnostic models against them. Results are delivered as a PDF to the email address you provide. This platform is free. Policy Lab does not see, store, or access your files or results.
        </p>
        <p className="mt-2.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-warning)]">
          Research and educational use only &middot; Not a medical device
        </p>
      </header>

      <hr className="border-[var(--color-border)]" />

      {/* ── Available Models (Tier A) ────────── */}
      <section className="py-7">
        <h2 className="text-[18px] font-bold text-[var(--color-text)] mb-1.5">Available for analysis</h2>
        <p className="text-[13px] text-[var(--color-text-secondary)] mb-5">
          Upload a file and receive results by email. CPU models run instantly with no limits. GPU models have daily capacity limits.
        </p>

        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="border-b-2 border-[var(--color-border)]">
                <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Model</th>
                <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Input</th>
                <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] hidden md:table-cell">Description</th>
                <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Speed</th>
                <th className="py-2 text-[11px]"></th>
              </tr>
            </thead>
            <tbody>
              {activeModels.map((model) => (
                <tr key={model.slug} className="border-b border-[var(--color-border)]/60 hover:bg-[var(--color-bg-subtle)] transition-colors">
                  <td className="py-3 pr-4">
                    <Link href={`/models/${model.slug}`} className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary-dark)]">
                      {model.name}
                    </Link>
                  </td>
                  <td className="py-3 pr-4">
                    <InputIconGroup icons={model.inputIcons} />
                  </td>
                  <td className="py-3 pr-4 text-[var(--color-text-secondary)] hidden md:table-cell">
                    {model.tagline}
                  </td>
                  <td className="py-3 pr-4 text-[13px]">
                    <span className={model.computeType === 'cpu' ? 'text-[var(--color-primary-dark)] font-medium' : 'text-[var(--color-text-secondary)]'}>
                      {model.computeType === 'cpu' ? 'Instant' : model.estimatedTime}
                    </span>
                  </td>
                  <td className="py-3">
                    <Link
                      href={`/analyze/${model.slug}`}
                      className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--color-primary-dark)] hover:underline whitespace-nowrap"
                    >
                      Analyze <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Hospital Integration (Tier B) ────── */}
      <section className="py-7">
        <h2 className="text-[18px] font-bold text-[var(--color-text)] mb-1.5">Requires hospital integration</h2>
        <p className="text-[13px] text-[var(--color-text-secondary)] mb-5">
          These models produce interactive outputs (3D volumes, real-time segmentation) that cannot be delivered as a PDF. They need to run on hospital radiology workstations. The software is free and open-source — contact us for setup help.
        </p>

        {hospitalModels.map((model, i) => (
          <div key={model.slug} className={`py-4 ${i < hospitalModels.length - 1 ? 'border-b border-[var(--color-border)]/50' : ''}`}>
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Link href={`/models/${model.slug}`} className="font-semibold text-[var(--color-text)] hover:text-[var(--color-primary-dark)]">
                    {model.name}
                  </Link>
                  <InputIconGroup icons={model.inputIcons} />
                </div>
                <p className="text-[var(--color-text-secondary)] text-[14px] leading-relaxed">
                  {model.tagline}. {model.description}
                </p>
              </div>
              <Link href={`/models/${model.slug}`} className="text-[13px] font-semibold text-[var(--color-primary-dark)] hover:underline shrink-0 mt-0.5">
                Details
              </Link>
            </div>
          </div>
        ))}
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Coming Soon (Tier C) ─────────────── */}
      <section className="py-7">
        <h2 className="text-[18px] font-bold text-[var(--color-text)] mb-1.5">Pending equipment</h2>
        {comingSoonModels.map((model) => (
          <div key={model.slug} className="mt-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-[var(--color-text)]">{model.name}</span>
              <InputIconGroup icons={model.inputIcons} />
            </div>
            <p className="text-[var(--color-text-secondary)] text-[14px] leading-relaxed">
              {model.tagline}. {model.whyNotAvailable}
              {' '}<Link href={`/models/${model.slug}`} className="text-[var(--color-primary-dark)] hover:underline">Full details.</Link>
            </p>
          </div>
        ))}
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── How it works ─────────────────────── */}
      <section className="py-7">
        <h2 className="text-[18px] font-bold text-[var(--color-text)] mb-4">How it works</h2>
        <ol className="space-y-3 text-[var(--color-text-secondary)] leading-relaxed">
          <li><strong className="text-[var(--color-text)]">1. Choose a model</strong> from the table above and click &ldquo;Analyze.&rdquo; Each model page lists the exact file format, input requirements, and what the model detects.</li>
          <li><strong className="text-[var(--color-text)]">2. Enter your email and upload your file.</strong> The file is encrypted in your browser (AES-256-GCM) before upload. The unencrypted file never leaves your device.</li>
          <li><strong className="text-[var(--color-text)]">3. The AI model processes your file</strong> on a secure GPU (or CPU for X-ray and retinal models). DICOM patient metadata is stripped automatically before inference.</li>
          <li><strong className="text-[var(--color-text)]">4. Results are emailed</strong> as a PDF report to the address you provided. The download link expires in 24 hours. All files are permanently deleted.</li>
        </ol>
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Privacy ──────────────────────────── */}
      <section className="py-7">
        <h2 className="text-[18px] font-bold text-[var(--color-text)] mb-4">Privacy</h2>
        <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-3">
          <p>
            Files are encrypted client-side (AES-256-GCM, Web Crypto API) before upload. The encryption key is generated per-upload in your browser. Encrypted files are stored temporarily with a 24-hour lifecycle policy. The inference worker decrypts in memory, strips DICOM PHI, runs the model, and discards all data.
          </p>
          <p>
            <strong className="text-[var(--color-text)]">Policy Lab can see:</strong> aggregate usage counts, processing times, error rates.{' '}
            <strong className="text-[var(--color-text)]">Policy Lab cannot see:</strong> uploaded files, results, email addresses (hashed only for rate-limiting), or any patient data.
          </p>
          <p className="text-[13px]"><Link href="/privacy" className="text-[var(--color-primary-dark)] hover:underline">Full privacy policy &rarr;</Link></p>
        </div>
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── About these models ───────────────── */}
      <section className="py-7">
        <h2 className="text-[18px] font-bold text-[var(--color-text)] mb-4">About these models</h2>
        <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-3">
          <p>
            The AI models on this platform are not large language models. They are specialized machine learning algorithms, each trained on hundreds of thousands to millions of real medical images for a specific diagnostic task. They output quantitative scores (probabilities, risk percentages, severity grades), not generated text. They have been validated in peer-reviewed clinical studies published in <em>Cell</em>, <em>Nature Communications</em>, the <em>Journal of Clinical Oncology</em>, <em>Science Translational Medicine</em>, <em>JAMA</em>, and <em>Radiology: AI</em>.
          </p>
          <p>
            All models are open-source. This platform demonstrates what Maldivian hospitals can do with equipment they already own. The long-term goal is for hospitals to run these models directly on their own infrastructure.
          </p>
        </div>
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Compute ──────────────────────────── */}
      <section className="py-7">
        <h2 className="text-[18px] font-bold text-[var(--color-text)] mb-4">Compute</h2>
        <div className="text-[var(--color-text-secondary)] leading-relaxed space-y-3">
          <p>
            Policy Lab covers all model computation costs as a public service. CPU models (CheXpert, DR Screening) run instantly with no usage limits. GPU models (Pillar-0, Sybil, Mirai) have daily capacity limits due to processing costs. If capacity is reached, your analysis will be queued and you will be notified by email when results are ready.
          </p>
        </div>
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Footer matter ────────────────────── */}
      <section className="py-7">
        <Disclaimer />
        <p className="mt-5 text-[13px] text-[var(--color-text-secondary)]">
          Operated by the <a href="https://new.policylabmv.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary-dark)] hover:underline">Public Policy Lab, Maldives</a>.
          Contact: info@policylabmv.com.{' '}
          <Link href="/about" className="text-[var(--color-primary-dark)] hover:underline">About this project.</Link>{' '}
          <Link href="/faq" className="text-[var(--color-primary-dark)] hover:underline">FAQ.</Link>
        </p>
      </section>
    </div>
  )
}
