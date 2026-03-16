'use client'

import { useState } from 'react'
import type { ModelCondition } from '@/lib/models'
import { ChevronDown } from 'lucide-react'

const INITIAL_SHOW = 10

export function ConditionsList({ conditions }: { conditions: ModelCondition[] }) {
  const [expanded, setExpanded] = useState(false)
  const showAll = conditions.length <= INITIAL_SHOW + 3 // don't hide just 1-3 items
  const visible = showAll || expanded ? conditions : conditions.slice(0, INITIAL_SHOW)
  const remaining = conditions.length - INITIAL_SHOW

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0.5 text-[14px]">
        {visible.map((condition) => (
          <div key={condition.name} className="py-1 border-b border-[var(--color-border)]/30">
            <span className="font-medium text-[var(--color-text)]">{condition.name}</span>
            {condition.description && (
              <span className="text-[12px] text-[var(--color-text-secondary)]"> — {condition.description}</span>
            )}
          </div>
        ))}
      </div>
      {!showAll && !expanded && remaining > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 inline-flex items-center gap-1 text-[13px] text-[var(--color-primary-dark)] font-semibold hover:underline"
        >
          Show all {conditions.length} conditions <ChevronDown className="w-3.5 h-3.5" />
        </button>
      )}
      {!showAll && expanded && (
        <button
          onClick={() => setExpanded(false)}
          className="mt-3 inline-flex items-center gap-1 text-[13px] text-[var(--color-primary-dark)] font-semibold hover:underline"
        >
          Show fewer <ChevronDown className="w-3.5 h-3.5 rotate-180" />
        </button>
      )}
    </div>
  )
}
