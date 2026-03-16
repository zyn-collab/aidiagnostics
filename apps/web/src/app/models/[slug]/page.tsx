import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { Button } from '@/components/common/Button'
import { Disclaimer } from '@/components/common/Disclaimer'
import { getAllModels, getModelBySlug } from '@/lib/models'
import type { ModelTier } from '@/lib/models'
import { ArrowRight, FileText, Users, BarChart3, AlertCircle, BookOpen, ArrowLeft } from 'lucide-react'

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

const tierBadgeStyles: Record<ModelTier, string> = {
  active: 'bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]',
  hospital: 'bg-blue-50 text-blue-700',
  coming_soon: 'bg-gray-100 text-[var(--color-text-secondary)]',
}

export default async function ModelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = getModelBySlug(slug)
  if (!model) notFound()

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-hero-bg)] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link href="/models" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All models
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tierBadgeStyles[model.tier]}`}>
              {model.tierLabel}
            </span>
            {model.computeType === 'cpu' && (
              <span className="text-xs text-gray-400">Runs instantly on CPU</span>
            )}
            {model.computeType === 'gpu' && (
              <span className="text-xs text-gray-400">GPU processing &middot; {model.estimatedTime}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
            {model.name}
          </h1>
          <p className="text-xl text-[var(--color-primary)] font-medium mb-4">
            {model.tagline}
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mb-8">
            {model.description}
          </p>
          {model.tier === 'active' ? (
            <Button href={model.ctaHref}>
              {model.ctaText} <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button href={model.ctaHref} variant="secondary">
              {model.ctaText} <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* What it does */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                <h2 className="text-2xl font-bold text-[var(--color-text)]">What it does</h2>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {model.longDescription}
              </p>
            </section>

            {/* What it can detect */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
                <h2 className="text-2xl font-bold text-[var(--color-text)]">What it can detect</h2>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {model.whatItCanDetect}
              </p>
              <div className="flex flex-wrap gap-2">
                {model.conditions.map((condition) => (
                  <span
                    key={condition.name}
                    className="text-xs px-3 py-1.5 rounded-full bg-[var(--color-bg-subtle)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
                    title={condition.description}
                  >
                    {condition.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Who should use it */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-[var(--color-primary)]" />
                <h2 className="text-2xl font-bold text-[var(--color-text)]">Who should use it</h2>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">
                {model.whoShouldUse}
              </p>
            </section>

            {/* Confidence / Accuracy */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
                <h2 className="text-2xl font-bold text-[var(--color-text)]">How confident are the results</h2>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {model.confidenceStatement}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {model.performance.map((perf, i) => (
                  <div key={i} className="bg-[var(--color-bg-subtle)] rounded-lg p-4 border border-[var(--color-border)]">
                    <p className="text-2xl font-bold text-[var(--color-text)]">{perf.value}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{perf.metric} {perf.dataset}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* What to do with results */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">What to do with results</h2>
              <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-xl p-6">
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-[var(--color-text)]">Share results with your doctor.</strong> This platform provides additional information for clinical investigation — it does not replace professional medical judgment. A qualified healthcare professional must interpret all results in the context of the patient&apos;s full clinical picture.
                </p>
              </div>
            </section>

            {/* Limitations */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-[var(--color-warning)]" />
                <h2 className="text-2xl font-bold text-[var(--color-text)]">Limitations</h2>
              </div>
              <ul className="space-y-2">
                {model.limitations.map((limitation, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-warning)] shrink-0 mt-2" />
                    {limitation}
                  </li>
                ))}
              </ul>
            </section>

            {/* Why not available (Tier B & C) */}
            {model.whyNotAvailable && (
              <section>
                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">
                  {model.tier === 'coming_soon' ? 'Why this isn\'t active yet' : 'Why this isn\'t available as a web service'}
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {model.whyNotAvailable}
                </p>
              </section>
            )}

            {/* Research */}
            {(model.paperJournal || model.institution) && (
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-[var(--color-primary)]" />
                  <h2 className="text-2xl font-bold text-[var(--color-text)]">The research</h2>
                </div>
                <div className="bg-[var(--color-bg-subtle)] rounded-lg p-4 border border-[var(--color-border)]">
                  {model.paperTitle && (
                    <p className="font-semibold text-[var(--color-text)] mb-1">{model.paperTitle}</p>
                  )}
                  {model.paperJournal && (
                    <p className="text-sm text-[var(--color-text-secondary)]">Published in: {model.paperJournal}</p>
                  )}
                  {model.institution && (
                    <p className="text-sm text-[var(--color-text-secondary)]">Institution: {model.institution}</p>
                  )}
                  {model.paperUrl && (
                    <a href={model.paperUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-primary-dark)] hover:underline mt-2 inline-block">
                      Read the paper &rarr;
                    </a>
                  )}
                </div>
              </section>
            )}

            <Disclaimer />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Input requirements card */}
              <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
                <h3 className="font-bold text-[var(--color-text)] mb-4">Input Requirements</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-[var(--color-text-secondary)]">File type</p>
                    <p className="font-medium text-[var(--color-text)]">{model.inputDescription}</p>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-secondary)]">Accepted formats</p>
                    <p className="font-medium text-[var(--color-text)]">{model.inputFormats.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-secondary)]">Max file size</p>
                    <p className="font-medium text-[var(--color-text)]">{model.maxFileSizeMB} MB</p>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-secondary)]">Processing time</p>
                    <p className="font-medium text-[var(--color-text)]">{model.estimatedTime}</p>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-secondary)]">Compute</p>
                    <p className="font-medium text-[var(--color-text)]">{model.computeType === 'cpu' ? 'CPU (instant, no limits)' : 'GPU (daily limits apply)'}</p>
                  </div>
                </div>
              </div>

              {/* Output card */}
              <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
                <h3 className="font-bold text-[var(--color-text)] mb-3">Output</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {model.outputDescription}
                </p>
              </div>

              {/* CTA */}
              <div className="rounded-xl bg-[var(--color-hero-bg)] p-6">
                {model.tier === 'active' ? (
                  <>
                    <p className="text-white font-semibold mb-2">Ready to analyze?</p>
                    <p className="text-sm text-gray-400 mb-4">Upload your scan and get results by email.</p>
                    <Button href={model.ctaHref} className="w-full">
                      {model.ctaText} <ArrowRight className="w-4 h-4" />
                    </Button>
                  </>
                ) : model.tier === 'hospital' ? (
                  <>
                    <p className="text-white font-semibold mb-2">Interested in this model?</p>
                    <p className="text-sm text-gray-400 mb-4">We can help set it up on your hospital&apos;s workstations for free.</p>
                    <Button href={model.ctaHref} className="w-full">
                      Contact us <ArrowRight className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-white font-semibold mb-2">Help bring this to the Maldives</p>
                    <p className="text-sm text-gray-400 mb-4">This model needs a slide scanner (~$18K-22K) to function.</p>
                    <Button href={model.ctaHref} className="w-full">
                      Get in touch <ArrowRight className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
