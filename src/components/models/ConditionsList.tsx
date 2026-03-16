'use client'

import { useState } from 'react'
import type { ConditionsData } from '@/lib/models'
import { ChevronDown, ChevronRight } from 'lucide-react'

export function ConditionsList({ conditions }: { conditions: ConditionsData }) {
  const [expanded, setExpanded] = useState(false)

  if (conditions.type === 'flat') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 text-[13px]">
        {conditions.items.map((c) => (
          <div key={c.name} className="py-1 border-b border-[var(--color-border)]/30">
            <span className="font-medium text-[var(--color-text)]">{c.name}</span>
            {c.description && (
              <span className="text-[11px] text-[var(--color-text-secondary)]"> — {c.description}</span>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Categorized list (e.g., Pillar-0 with 366 findings)
  const INITIAL_CATEGORIES = 4
  const allCategories = conditions.categories
  const showAll = allCategories.length <= INITIAL_CATEGORIES + 2
  const visible = showAll || expanded ? allCategories : allCategories.slice(0, INITIAL_CATEGORIES)

  return (
    <div>
      <p className="text-[13px] text-[var(--color-text-secondary)] mb-3">
        {conditions.totalCount} findings across {allCategories.length} categories. {!showAll && !expanded && 'Showing first few categories — expand to see all.'}
      </p>

      <div className="space-y-3">
        {visible.map((cat) => (
          <CategoryRow key={cat.category} category={cat.category} conditions={cat.conditions} />
        ))}
      </div>

      {!showAll && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex items-center gap-1 text-[13px] text-[var(--color-primary-dark)] font-semibold hover:underline"
        >
          {expanded ? (
            <>Show fewer categories <ChevronDown className="w-3.5 h-3.5 rotate-180" /></>
          ) : (
            <>Show all {allCategories.length} categories ({conditions.totalCount} findings) <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      )}
    </div>
  )
}

function CategoryRow({ category, conditions }: { category: string; conditions: string[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-[var(--color-border)]/50 rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-[var(--color-bg-subtle)] transition-colors rounded-lg"
      >
        <span className="text-[13px]">
          <span className="font-semibold text-[var(--color-text)]">{category}</span>
          <span className="text-[var(--color-text-secondary)] ml-2">({conditions.length})</span>
        </span>
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-secondary)]" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-secondary)]" />
        )}
      </button>
      {open && (
        <div className="px-3 pb-2.5 grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-0.5">
          {conditions.map((c) => (
            <span key={c} className="text-[11px] text-[var(--color-text-secondary)] py-0.5">{c}</span>
          ))}
        </div>
      )}
    </div>
  )
}
