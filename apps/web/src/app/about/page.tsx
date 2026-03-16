import { SectionLabel } from '@/components/layout/SectionLabel'
import { Button } from '@/components/common/Button'
import { ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'About — AIMED',
  description: 'About the AIMED platform and the Public Policy Lab, Maldives.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-[var(--color-hero-bg)] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>About</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            About AIMED
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            A policy demonstration tool by the Public Policy Lab, Maldives.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-3xl space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">What is AIMED?</h2>
            <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                AIMED (AI Medical Diagnostics) is a free, public-facing platform that lets doctors, researchers, and healthcare professionals upload standard medical imaging files and run peer-reviewed, open-source AI diagnostic models against them.
              </p>
              <p>
                Results are delivered directly to the email address the user provides. Policy Lab never sees, stores, or has access to uploaded files or results.
              </p>
              <p>
                This is a <strong className="text-[var(--color-text)]">policy demonstration tool</strong>, not a medical device. The goal is to show Maldivian hospitals and policymakers what AI-assisted diagnostics can do with equipment they already own, creating organic demand for adoption.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">Public Policy Lab, Maldives</h2>
            <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                The Public Policy Lab is an independent policy research organization focused on bringing evidence-based tools and open-source technology to Maldivian public institutions.
              </p>
              <p>
                This medical AI platform sits within our <strong className="text-[var(--color-text)]">Information Policy &amp; Data Usability</strong> focus area. We believe that the tools to deliver better healthcare already exist — they just need to be made accessible, understandable, and trustworthy enough for institutional adoption.
              </p>
              <p>
                Our approach is to demonstrate value first. By making these models available for free, we build evidence that AI-assisted diagnostics work, that they work with Maldivian equipment, and that they can be deployed safely with proper privacy protections.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">Why this matters for the Maldives</h2>
            <div className="space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
              <p>
                The Maldives has modern medical imaging equipment in its hospitals — CT scanners, X-ray machines, MRI systems, mammography units. These machines produce standard digital files (DICOM format) that world-class AI models can analyze.
              </p>
              <p>
                But access to specialist radiologists is unevenly distributed. Atoll health centers may have imaging equipment but rely on distant specialists for interpretation. AI-assisted screening can fill this gap — not replacing specialists, but extending their reach.
              </p>
              <p>
                The models on this platform are not experimental prototypes. They have been published in <em>Cell</em>, <em>Nature</em>, <em>JAMA</em>, the <em>Journal of Clinical Oncology</em>, and <em>Science Translational Medicine</em>. They have been validated on millions of patients across dozens of countries. They are free and open-source.
              </p>
              <p>
                The only barrier to adoption is institutional awareness and willingness. This platform removes that barrier.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">Contact</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              For questions about the platform, hospital integration support, or partnership inquiries:
            </p>
            <p className="text-[var(--color-text)] font-medium mb-6">info@policylabmv.com</p>
            <Button href="https://new.policylabmv.com" variant="outline">
              <ExternalLink className="w-4 h-4" /> Visit policylabmv.com
            </Button>
          </section>
        </div>
      </div>
    </>
  )
}
