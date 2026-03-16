'use client'

import { useState } from 'react'
import Link from 'next/link'
import { InputIconGroup } from '@/components/models/InputIcons'
import { ConditionsList } from '@/components/models/ConditionsList'
import type { ModelInfo } from '@/lib/models'
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'

export function ModelTable({ models }: { models: ModelInfo[] }) {
  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full text-left text-[14px]">
        <thead>
          <tr className="border-b-2 border-[var(--color-border)]">
            <th className="py-2 pr-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] w-5"></th>
            <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Model</th>
            <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Input</th>
            <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] hidden md:table-cell">Description</th>
            <th className="py-2 pr-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">Speed</th>
            <th className="py-2 text-[11px]"></th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <ExpandableModelRow key={model.slug} model={model} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ExpandableModelRow({ model }: { model: ModelInfo }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <tr
        className="border-b border-[var(--color-border)]/60 hover:bg-[var(--color-bg-subtle)] transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="py-3 pr-1 text-[var(--color-text-secondary)]">
          {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </td>
        <td className="py-3 pr-4">
          <span className="font-semibold text-[var(--color-text)]">{model.name}</span>
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
            onClick={(e) => e.stopPropagation()}
          >
            Analyze <ArrowRight className="w-3 h-3" />
          </Link>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-[var(--color-border)]/60 bg-[var(--color-bg-subtle)]">
          <td></td>
          <td colSpan={5} className="py-4 pr-6">
            <div className="space-y-4 max-w-[700px]">
              <p className="text-[var(--color-text-secondary)] text-[14px] leading-relaxed">{model.description}</p>

              {/* Quick specs */}
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-[12px]">
                <span><span className="text-[var(--color-text-secondary)]">Input:</span> <span className="font-medium text-[var(--color-text)]">{model.inputDescription}</span></span>
                <span><span className="text-[var(--color-text-secondary)]">Formats:</span> <span className="font-medium text-[var(--color-text)]">{model.acceptedExtensions.join(', ')}</span></span>
                <span><span className="text-[var(--color-text-secondary)]">Max:</span> <span className="font-medium text-[var(--color-text)]">{model.maxFileSizeMB} MB</span></span>
              </div>

              {/* Conditions */}
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-2">What it screens for</p>
                <ConditionsList conditions={model.conditions} />
              </div>

              {/* Key performance */}
              {model.performance.length > 0 && (
                <div className="text-[12px] text-[var(--color-text-secondary)]">
                  {model.performance.map((p, i) => (
                    <span key={i} className="mr-4">
                      <span className="font-semibold text-[var(--color-text)]">{p.value}</span> {p.metric} {p.dataset}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 text-[13px]">
                <Link
                  href={`/models/${model.slug}`}
                  className="text-[var(--color-primary-dark)] font-medium hover:underline"
                >
                  Full details &rarr;
                </Link>
                <Link
                  href={`/analyze/${model.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  Analyze <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
