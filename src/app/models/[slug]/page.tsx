import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Disclaimer } from '@/components/common/Disclaimer'
import { InputIconGroup } from '@/components/models/InputIcons'
import { ConditionsList } from '@/components/models/ConditionsList'
import { getAllModels, getModelBySlug } from '@/lib/models'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export async function generateStaticParams() {
  return getAllModels().map((model) => ({ slug: model.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = getModelBySlug(slug)
  if (!model) return { title: 'Model Not Found — AIMED' }
  return {
    title: `${model.name} — AIMED`,
    description: model.description,
  }
}

export default async function ModelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = getModelBySlug(slug)
  if (!model) notFound()

  return (
    <div className="max-w-[960px] mx-auto px-6 pb-12">
      {/* ── Header ───────────────────────────── */}
      <header className="pt-8 pb-6">
        <Link href="/" className="inline-flex items-center gap-1 text-[13px] text-[var(--color-primary-dark)] hover:underline mb-5">
          <ArrowLeft className="w-3.5 h-3.5" /> All models
        </Link>

        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-[24px] font-bold text-[var(--color-text)]">{model.name}</h1>
          <InputIconGroup icons={model.inputIcons} size="md" />
          <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${
            model.tier === 'active' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]' :
            model.tier === 'hospital' ? 'bg-blue-50 text-blue-700' :
            'bg-gray-100 text-[var(--color-text-secondary)]'
          }`}>
            {model.tierLabel}
          </span>
        </div>

        <p className="text-[var(--color-text-secondary)] text-[16px]">{model.tagline}</p>
      </header>

      <hr className="border-[var(--color-border)]" />

      {/* ── Quick specs ──────────────────────── */}
      <div className="py-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[13px]">
        <div>
          <span className="text-[var(--color-text-secondary)]">Input: </span>
          <span className="font-medium text-[var(--color-text)]">{model.inputDescription}</span>
        </div>
        <div>
          <span className="text-[var(--color-text-secondary)]">Formats: </span>
          <span className="font-medium text-[var(--color-text)]">{model.acceptedExtensions.join(', ')}</span>
        </div>
        <div>
          <span className="text-[var(--color-text-secondary)]">Max size: </span>
          <span className="font-medium text-[var(--color-text)]">{model.maxFileSizeMB} MB</span>
        </div>
        <div>
          <span className="text-[var(--color-text-secondary)]">Speed: </span>
          <span className="font-medium text-[var(--color-text)]">
            {model.computeType === 'cpu' ? `CPU — ${model.estimatedTime}` : `GPU — ${model.estimatedTime}`}
          </span>
        </div>
        {model.tier === 'active' && (
          <div className="ml-auto">
            <Link href={model.ctaHref} className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary-dark)] hover:underline">
              {model.ctaText} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      <hr className="border-[var(--color-border)]" />

      {/* ── Description ──────────────────────── */}
      <section className="py-6">
        <h2 className="text-[16px] font-bold text-[var(--color-text)] mb-2.5">What it does</h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{model.longDescription}</p>
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── What it can detect ───────────────── */}
      <section className="py-6">
        <h2 className="text-[16px] font-bold text-[var(--color-text)] mb-2.5">What it can detect</h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">{model.whatItCanDetect}</p>
        <ConditionsList conditions={model.conditions} />
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Who should use it ────────────────── */}
      <section className="py-6">
        <h2 className="text-[16px] font-bold text-[var(--color-text)] mb-2.5">Who should use it</h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{model.whoShouldUse}</p>
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Accuracy & validation ────────────── */}
      <section className="py-6">
        <h2 className="text-[16px] font-bold text-[var(--color-text)] mb-2.5">Accuracy and validation</h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">{model.confidenceStatement}</p>
        {model.performance.length > 0 && (
          <table className="text-[13px]">
            <tbody>
              {model.performance.map((perf, i) => (
                <tr key={i} className="border-b border-[var(--color-border)]/50">
                  <td className="py-1.5 pr-5 font-semibold text-[var(--color-text)]">{perf.value}</td>
                  <td className="py-1.5 pr-5 text-[var(--color-text-secondary)]">{perf.metric}</td>
                  <td className="py-1.5 text-[var(--color-text-secondary)]">{perf.dataset}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Output format ────────────────────── */}
      <section className="py-6">
        <h2 className="text-[16px] font-bold text-[var(--color-text)] mb-2.5">Output format</h2>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">{model.outputDescription}</p>
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Limitations ──────────────────────── */}
      <section className="py-6">
        <h2 className="text-[16px] font-bold text-[var(--color-text)] mb-2.5">Limitations</h2>
        <ul className="space-y-1.5">
          {model.limitations.map((limitation, i) => (
            <li key={i} className="text-[var(--color-text-secondary)] leading-relaxed flex items-start gap-2">
              <span className="text-[var(--color-warning)] mt-1">&#8226;</span>
              {limitation}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Why not available (Tier B & C) ──── */}
      {model.whyNotAvailable && (
        <>
          <hr className="border-[var(--color-border)]" />
          <section className="py-6">
            <h2 className="text-[16px] font-bold text-[var(--color-text)] mb-2.5">
              {model.tier === 'coming_soon' ? 'Why this isn\'t active yet' : 'Why this isn\'t available as a web service'}
            </h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">{model.whyNotAvailable}</p>
          </section>
        </>
      )}

      {/* ── Research ─────────────────────────── */}
      {(model.paperJournal || model.institution) && (
        <>
          <hr className="border-[var(--color-border)]" />
          <section className="py-6">
            <h2 className="text-[16px] font-bold text-[var(--color-text)] mb-2.5">Research</h2>
            <div className="text-[var(--color-text-secondary)] text-[14px] leading-relaxed space-y-0.5">
              {model.paperTitle && <p className="font-medium text-[var(--color-text)]">{model.paperTitle}</p>}
              {model.paperJournal && <p>Published in: {model.paperJournal}</p>}
              {model.institution && <p>Institution: {model.institution}</p>}
              {model.paperUrl && (
                <p className="mt-1">
                  <a href={model.paperUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary-dark)] hover:underline">
                    Read the paper &rarr;
                  </a>
                </p>
              )}
            </div>
          </section>
        </>
      )}

      <hr className="border-[var(--color-border)]" />

      {/* ── What to do with results + CTA ───── */}
      <section className="py-6">
        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-5">
          <strong className="text-[var(--color-text)]">What to do with results:</strong> Share with your doctor for clinical interpretation. This platform provides additional information for investigation — it does not replace professional medical judgment.
        </p>

        {model.tier === 'active' && (
          <Link
            href={model.ctaHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-[14px] font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            {model.ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        )}

        {model.tier === 'hospital' && (
          <div>
            <p className="text-[13px] text-[var(--color-text-secondary)] mb-3">
              This model needs to be installed on a hospital radiology workstation. The software is free and open-source.
            </p>
            <a
              href={model.ctaHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-hero-bg)] text-white text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              {model.ctaText} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

        {model.tier === 'coming_soon' && (
          <a
            href={model.ctaHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-hero-bg)] text-white text-[14px] font-semibold hover:opacity-90 transition-opacity"
          >
            {model.ctaText} <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </section>

      <hr className="border-[var(--color-border)]" />

      {/* ── Disclaimer ───────────────────────── */}
      <section className="py-5">
        <Disclaimer />
      </section>
    </div>
  )
}
