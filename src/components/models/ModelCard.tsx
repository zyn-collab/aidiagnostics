import Link from 'next/link'
import { ArrowRight, Building2, Clock } from 'lucide-react'
import type { ModelInfo } from '@/lib/models'

const tierStyles = {
  active: 'bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]',
  hospital: 'bg-blue-50 text-blue-700',
  coming_soon: 'bg-gray-100 text-[var(--color-text-secondary)]',
}

const tierIcons = {
  active: null,
  hospital: Building2,
  coming_soon: Clock,
}

export function ModelCard({ model }: { model: ModelInfo }) {
  const Icon = tierIcons[model.tier]

  return (
    <div className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 flex flex-col ${model.tier === 'coming_soon' ? 'opacity-75' : ''}`}>
      {/* Tier badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${tierStyles[model.tier]}`}>
          {Icon && <Icon className="w-3 h-3" />}
          {model.tierLabel}
        </span>
        {model.computeType === 'cpu' && model.tier === 'active' && (
          <span className="text-xs text-[var(--color-text-secondary)]">Instant</span>
        )}
      </div>

      {/* Name + tagline */}
      <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">{model.name}</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-3">{model.tagline}</p>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-1">
        {model.description}
      </p>

      {/* Key stat */}
      {model.performance[0] && (
        <p className="text-xs text-[var(--color-text-secondary)] mb-4">
          <span className="font-semibold text-[var(--color-text)]">{model.performance[0].value}</span>{' '}
          {model.performance[0].metric.toLowerCase()} {model.performance[0].dataset}
        </p>
      )}

      {/* Input format */}
      <p className="text-xs text-[var(--color-text-secondary)] mb-4">
        Input: {model.inputFormats.join(', ')}
      </p>

      {/* CTA */}
      {model.tier === 'active' ? (
        <Link
          href={model.ctaHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-colors mt-auto"
        >
          {model.ctaText} <ArrowRight className="w-4 h-4" />
        </Link>
      ) : model.tier === 'hospital' ? (
        <Link
          href={`/models/${model.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-600 transition-colors mt-auto"
        >
          Learn more <ArrowRight className="w-4 h-4" />
        </Link>
      ) : (
        <Link
          href={`/models/${model.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] mt-auto"
        >
          Learn more <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}
