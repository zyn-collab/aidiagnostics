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
    <div className="max-w-[960px] mx-auto px-6">
      {/* ── Header ───────────────────────────── */}
      <header className="pt-8 pb-6 border-b border-[var(--color-border)]">
        <Link href="/" className="inline-flex items-center gap-1 text-[var(--color-primary-dark)] hover:underline mb-4">
          <ArrowLeft className="w-4 h-4" /> All models
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">{model.name}</h1>
          <InputIconGroup icons={model.inputIcons} size="md" />
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
            model.tier === 'active' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]' :
            model.tier === 'hospital' ? 'bg-blue-50 text-blue-700' :
            'bg-gray-100 text-[var(--color-text-secondary)]'
          }`}>
            {model.tierLabel}
          </span>
        </div>

        <p className="text-lg text-[var(--color-text-secondary)]">{model.tagline}</p>
      </header>

      {/* ── Quick specs bar ──────────────────── */}
      <div className="py-4 border-b border-[var(--color-border)] flex flex-wrap gap-x-8 gap-y-2 text-sm">
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

      {/* ── Description ──────────────────────── */}
      <section className="py-6 border-b border-[var(--color-border)]">
        <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">What it does</h2>
        <p className="text-[var(--color-text-secondary)]">{model.longDescription}</p>
      </section>

      {/* ── What it can detect ───────────────── */}
      <section className="py-6 border-b border-[var(--color-border)]">
        <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">What it can detect</h2>
        <p className="text-[var(--color-text-secondary)] mb-4">{model.whatItCanDetect}</p>
        <ConditionsList conditions={model.conditions} />
      </section>

      {/* ── Who should use it ────────────────── */}
      <section className="py-6 border-b border-[var(--color-border)]">
        <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Who should use it</h2>
        <p className="text-[var(--color-text-secondary)]">{model.whoShouldUse}</p>
      </section>

      {/* ── Accuracy & validation ────────────── */}
      <section className="py-6 border-b border-[var(--color-border)]">
        <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Accuracy and validation</h2>
        <p className="text-[var(--color-text-secondary)] mb-4">{model.confidenceStatement}</p>
        {model.performance.length > 0 && (
          <table className="text-sm">
            <tbody>
              {model.performance.map((perf, i) => (
                <tr key={i} className="border-b border-[var(--color-border)]/50">
                  <td className="py-2 pr-6 font-medium text-[var(--color-text)]">{perf.value}</td>
                  <td className="py-2 pr-6 text-[var(--color-text-secondary)]">{perf.metric}</td>
                  <td className="py-2 text-[var(--color-text-secondary)]">{perf.dataset}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* ── Output format ────────────────────── */}
      <section className="py-6 border-b border-[var(--color-border)]">
        <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Output format</h2>
        <p className="text-[var(--color-text-secondary)]">{model.outputDescription}</p>
      </section>

      {/* ── Limitations ──────────────────────── */}
      <section className="py-6 border-b border-[var(--color-border)]">
        <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Limitations</h2>
        <ul className="space-y-1.5">
          {model.limitations.map((limitation, i) => (
            <li key={i} className="text-[var(--color-text-secondary)] flex items-start gap-2">
              <span className="text-[var(--color-warning)] mt-1.5">&#8226;</span>
              {limitation}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Why not available (Tier B & C) ──── */}
      {model.whyNotAvailable && (
        <section className="py-6 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">
            {model.tier === 'coming_soon' ? 'Why this isn\'t active yet' : 'Why this isn\'t available as a web service'}
          </h2>
          <p className="text-[var(--color-text-secondary)]">{model.whyNotAvailable}</p>
        </section>
      )}

      {/* ── Research ─────────────────────────── */}
      {(model.paperJournal || model.institution) && (
        <section className="py-6 border-b border-[var(--color-border)]">
          <h2 className="text-lg font-bold text-[var(--color-text)] mb-3">Research</h2>
          <div className="text-[var(--color-text-secondary)]">
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
      )}

      {/* ── What to do with results ──────────── */}
      <section className="py-6 border-b border-[var(--color-border)]">
        <p className="text-[var(--color-text-secondary)]">
          <strong className="text-[var(--color-text)]">What to do with results:</strong> Share with your doctor for clinical interpretation. This platform provides additional information for investigation — it does not replace professional medical judgment.
        </p>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      {model.tier === 'active' && (
        <section className="py-6 border-b border-[var(--color-border)]">
          <Link
            href={model.ctaHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            {model.ctaText} <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      )}

      {model.tier === 'hospital' && (
        <section className="py-6 border-b border-[var(--color-border)]">
          <p className="text-[var(--color-text-secondary)] mb-3">
            This model needs to be installed on a hospital radiology workstation. The software is free and open-source.
          </p>
          <a
            href={model.ctaHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-hero-bg)] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {model.ctaText} <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      )}

      {model.tier === 'coming_soon' && (
        <section className="py-6 border-b border-[var(--color-border)]">
          <a
            href={model.ctaHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-hero-bg)] text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {model.ctaText} <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      )}

      {/* ── Disclaimer ───────────────────────── */}
      <section className="py-6">
        <Disclaimer />
      </section>
    </div>
  )
}
