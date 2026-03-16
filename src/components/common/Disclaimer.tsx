import { AlertTriangle } from 'lucide-react'

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-warning-bg)] text-[var(--color-warning)] text-xs font-semibold">
        <AlertTriangle className="w-3.5 h-3.5" />
        Research use only — not a medical device
      </div>
    )
  }

  return (
    <div className="bg-[var(--color-warning-bg)] border border-[var(--color-warning)]/20 rounded-xl p-5">
      <div className="flex gap-3">
        <AlertTriangle className="w-5 h-5 text-[var(--color-warning)] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-[var(--color-warning)] mb-1">Research Use Only</p>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            This platform is for research and educational purposes only. It is not a medical device and has not been cleared by any regulatory body. All results must be reviewed by a qualified healthcare professional. Do not make clinical decisions based solely on results from this platform.
          </p>
        </div>
      </div>
    </div>
  )
}
