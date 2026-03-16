import { SectionLabel } from '@/components/layout/SectionLabel'
import { ModelCard } from '@/components/models/ModelCard'
import { getActiveModels, getHospitalModels, getComingSoonModels } from '@/lib/models'

export const metadata = {
  title: 'AI Models — AIMED',
  description: 'Browse all available medical AI models. Upload scans for instant analysis or learn about models ready for hospital integration.',
}

export default function ModelsPage() {
  const activeModels = getActiveModels()
  const hospitalModels = getHospitalModels()
  const comingSoonModels = getComingSoonModels()

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-hero-bg)] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>All Models</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Medical AI Models
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            8 peer-reviewed, open-source AI models covering radiology, oncology, and ophthalmology. Choose a model to learn more or start an analysis.
          </p>
        </div>
      </section>

      {/* Active models */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>Analyze Now</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">
            Upload a scan and get results by email
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8">
            These models accept standard medical imaging files and deliver results as a PDF report.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Hospital integration */}
      <section className="py-16 md:py-20 bg-[var(--color-bg-subtle)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>Hospital Integration</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">
            Ready for hospital workstations
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl">
            These models produce interactive outputs that need to run on hospital imaging systems. Free and open-source — we can help your hospital set them up.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {hospitalModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming soon */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>Coming Soon</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-2">
            Waiting for equipment
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl">
            Published, validated, and open-source — but requires equipment not yet available in the Maldives.
          </p>
          <div className="max-w-lg">
            {comingSoonModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
