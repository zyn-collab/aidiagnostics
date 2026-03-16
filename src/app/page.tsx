import { SectionLabel } from '@/components/layout/SectionLabel'
import { Button } from '@/components/common/Button'
import { StatsBar } from '@/components/common/StatsBar'
import { Disclaimer } from '@/components/common/Disclaimer'
import { ModelCard } from '@/components/models/ModelCard'
import { getActiveModels, getHospitalModels, getComingSoonModels } from '@/lib/models'
import { Shield, Cpu, Mail, Lock, Scan, Brain, Eye } from 'lucide-react'

export default function HomePage() {
  const activeModels = getActiveModels()
  const hospitalModels = getHospitalModels()
  const comingSoonModels = getComingSoonModels()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="bg-[var(--color-hero-bg)] relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)] mb-6">
              Public Policy Lab &middot; Maldives
            </p>
            <h1 className="text-4xl md:text-[3.5rem] font-extrabold text-white leading-[1.1] mb-6">
              Open-source medical AI — free for the Maldives
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
              Upload a CT scan, X-ray, mammogram, or retinal photo. Get AI-assisted analysis from models published in <em>Cell</em>, <em>Nature</em>, and the <em>Journal of Clinical Oncology</em> — processed privately and delivered to your email.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Button href="/models" variant="primary">Start an analysis</Button>
              <Button href="/models" variant="secondary">See all models</Button>
            </div>
            <Disclaimer compact />
          </div>
        </div>
      </section>

      {/* ── What This Is ─────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>What This Is</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-8 max-w-2xl">
            AI diagnostics that work with equipment you already have
          </h2>
          <div className="max-w-3xl space-y-5 text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              Every hospital in the Maldives has CT scanners, X-ray machines, MRI systems, and mammography equipment. These machines produce standard digital files (DICOM format) that can be read by AI models trained on millions of similar scans.
            </p>
            <p>
              World-class AI models — published in the most prestigious medical journals and validated on real patients across dozens of countries — can analyze these files to screen for hundreds of conditions, predict cancer risk years in advance, and map anatomy in 3D.
            </p>
            <p>
              This platform makes those models accessible for free. Upload a scan, and the AI processes it privately on a secure GPU. Results are sent directly to an email address you provide. Policy Lab never sees your files or results.
            </p>
            <p>
              The goal is to demonstrate what&apos;s possible so that Maldivian hospitals adopt these tools directly into their workflows — bringing specialist-level screening to every atoll health center.
            </p>
          </div>
        </div>
      </section>

      {/* ── Not Chatbots ─────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[var(--color-bg-subtle)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>How This Works</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-8 max-w-2xl">
            These are not chatbots
          </h2>
          <div className="max-w-3xl space-y-5 text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              The models on this platform are not large language models like ChatGPT. They are specialized machine learning algorithms trained on hundreds of thousands of real medical scans — learning to detect patterns the same way a radiologist does, by reviewing many examples.
            </p>
            <p>
              They don&apos;t generate text or hold conversations. They take in a scan and output specific, measurable findings: probability scores, risk percentages, and anatomical measurements. They have been rigorously validated in peer-reviewed clinical studies and their accuracy is quantified.
            </p>
            <p>
              Unlike chatbots, they cannot hallucinate findings — they can only score the patterns they were trained to detect.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
              <Brain className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="font-bold text-[var(--color-text)] mb-2">Narrowly specialized</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">One model does one thing very well. Each is trained for a specific imaging type and set of conditions.</p>
            </div>
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
              <Scan className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="font-bold text-[var(--color-text)] mb-2">Quantitative outputs</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Probability scores, measurements, risk percentages — not opinions or generated text.</p>
            </div>
            <div className="bg-white rounded-xl border border-[var(--color-border)] p-6">
              <Eye className="w-8 h-8 text-[var(--color-primary)] mb-4" />
              <h3 className="font-bold text-[var(--color-text)] mb-2">Peer-reviewed accuracy</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">Validated in clinical studies on real patients, with measurable, published accuracy figures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>The Process</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-12 max-w-2xl">
            Three steps to AI-assisted analysis
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">1. Choose a model and upload</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Select an AI model for your scan type. Upload your file — DICOM, PNG, JPEG, or NIfTI depending on the model. Supported: CT, X-ray, mammogram, MRI, and fundus photos.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                <Lock className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">2. Secure AI processing</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                Your file is encrypted before it leaves your browser. It&apos;s processed on a secure GPU and Policy Lab never sees it. All files are permanently deleted within 24 hours.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-5">
                <Mail className="w-6 h-6 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-2">3. Results emailed to you</h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                A PDF report with your results is sent directly to the email address you provide. Only you receive the results. Share them with your doctor for clinical interpretation.
              </p>
            </div>
          </div>

          {/* Privacy callout */}
          <div className="mt-12 bg-[var(--color-hero-bg)] rounded-xl p-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-[var(--color-primary)] shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-white mb-2">Your privacy is absolute</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Your files are encrypted before they leave your browser. They are processed directly by the AI model on a secure GPU and the results are sent only to the email address you provide. Policy Lab staff cannot see, access, or retrieve your uploads or results at any point. All files are permanently deleted within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Active Models ────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[var(--color-bg-subtle)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>Available Models</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
            Upload a scan and get results by email
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-10 max-w-2xl">
            These models accept standard medical imaging files and deliver results as a PDF report to your email.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Hospital Integration Models ──────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>Hospital Adoption</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
            Models that need hospital workstations
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-10 max-w-2xl">
            These models are free and open-source but produce interactive outputs that need to run on hospital imaging systems, not as a web service. We can help your hospital set them up.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {hospitalModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming Soon ──────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[var(--color-bg-subtle)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>Coming Soon</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-3">
            Waiting for the right equipment
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-10 max-w-2xl">
            This model is published, validated, and open-source — but requires equipment that no Maldivian hospital currently owns.
          </p>
          <div className="max-w-lg">
            {comingSoonModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────── */}
      <StatsBar />

      {/* ── Funding Section ──────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>How This Is Funded</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-8 max-w-2xl">
            A public service, not a business
          </h2>
          <div className="max-w-3xl space-y-5 text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              Policy Lab covers the computation costs of running these analyses as a public service. Due to the cost of GPU processing, there are daily limits on how many analyses we can run for GPU-intensive models. CPU models (chest X-ray and retinal screening) have no limits and run instantly.
            </p>
            <p>
              If demand is high for GPU models, your results may be queued. Our hope is that hospitals in the Maldives will eventually run these models on their own infrastructure — this platform is a demonstration of what&apos;s possible.
            </p>
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[var(--color-bg-subtle)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>About</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-8 max-w-2xl">
            Public Policy Lab, Maldives
          </h2>
          <div className="max-w-3xl space-y-5 text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              The Public Policy Lab is an independent policy research organization focused on bringing evidence-based tools and open-source technology to Maldivian public institutions. This medical AI platform sits within our Information Policy &amp; Data Usability focus area.
            </p>
            <p>
              Our goal is not to replace doctors or hospitals — it is to show what is already possible with the equipment and data they have, and to create organic demand for AI-assisted diagnostics across the Maldivian health system.
            </p>
          </div>
          <div className="mt-8">
            <Button href="https://new.policylabmv.com" variant="outline">
              Visit policylabmv.com
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
