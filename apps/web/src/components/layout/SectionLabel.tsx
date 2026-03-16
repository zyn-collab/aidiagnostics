export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-3">
      {children}
    </p>
  )
}
