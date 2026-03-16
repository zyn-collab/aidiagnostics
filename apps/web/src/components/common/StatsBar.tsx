const stats = [
  { value: '8', label: 'AI Models' },
  { value: 'Nature, Cell, JAMA', label: 'Published in' },
  { value: 'Millions', label: 'Patients Validated On' },
  { value: 'Free', label: 'And Open-Source' },
]

export function StatsBar() {
  return (
    <section className="bg-[var(--color-bg-stats)]">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
