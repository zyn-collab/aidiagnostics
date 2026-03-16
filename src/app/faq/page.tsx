'use client'

import { useState } from 'react'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is this a medical device?',
    answer: 'No. This platform is operated by the Public Policy Lab (Maldives) for research and educational purposes only. It is not a medical device, has not been cleared or approved by any regulatory body, and does not provide medical advice, diagnosis, or treatment recommendations. All results must be reviewed by a qualified healthcare professional.',
  },
  {
    question: 'Can Policy Lab see my uploaded files or results?',
    answer: 'No. Your files are encrypted in your browser before upload. Policy Lab staff cannot see, access, or retrieve your uploads or results at any point. We only collect aggregate statistics (number of analyses per day, processing times, error rates) with no identifying information.',
  },
  {
    question: 'How accurate are the AI models?',
    answer: 'Accuracy varies by model and is detailed on each model\'s page. For example, CheXpert achieves AUC 0.90+ for major chest findings, Sybil achieves 92% accuracy for 1-year lung cancer prediction, and DR Screening achieves 97%+ for detecting referable diabetic retinopathy. All models have been validated in peer-reviewed clinical studies. However, no AI model is perfect — results should always be interpreted by a qualified doctor.',
  },
  {
    question: 'What file formats are supported?',
    answer: 'It depends on the model. Chest X-ray analysis (CheXpert) accepts PNG, JPEG, or DICOM. CT-based models (Pillar-0, Sybil) accept DICOM folders. Mammogram analysis (Mirai) requires 4-view DICOM files. Retinal screening accepts PNG or JPEG fundus photos. Each model\'s page lists its specific input requirements.',
  },
  {
    question: 'Is this free?',
    answer: 'Yes, completely free. Policy Lab covers all computation costs as a public service. CPU-based models (chest X-ray and retinal screening) run instantly with no limits. GPU-based models (CT and mammogram analysis) have daily capacity limits due to processing costs. If demand is high, your analysis may be queued.',
  },
  {
    question: 'How long does it take to get results?',
    answer: 'CPU models (CheXpert chest X-ray, DR Screening) produce results in 2-3 seconds. GPU models vary: Sybil takes ~10-30 seconds, Mirai ~15 seconds, and Pillar-0 ~1 minute. There may be additional wait time if the GPU needs to start up (cold start) or if demand is high and your job is queued.',
  },
  {
    question: 'What happens to my data after processing?',
    answer: 'All uploaded files and generated results are permanently deleted from our systems within 24 hours. Result download links also expire after 24 hours. There is no archive, no backup, and no way to recover deleted files. We recommend downloading your results promptly.',
  },
  {
    question: 'Are these the same as ChatGPT?',
    answer: 'No. These are fundamentally different from large language models like ChatGPT. The models on this platform are specialized machine learning algorithms trained on hundreds of thousands of real medical scans. They don\'t generate text or hold conversations. They take in a scan and output specific, measurable findings: probability scores, risk percentages, and measurements. They cannot hallucinate findings — they can only score the patterns they were trained to detect.',
  },
  {
    question: 'Can I use this for clinical decisions?',
    answer: 'No. Results from this platform are for research and educational purposes only. They provide additional information that may be useful when reviewed by a qualified healthcare professional, but they should never be used as the sole basis for clinical decisions. Always consult with your doctor.',
  },
  {
    question: 'Why are some models marked "Hospital Integration"?',
    answer: 'Two models (TotalSegmentator and MedSAM) produce interactive 3D outputs or require real-time doctor interaction. These outputs cannot be meaningfully reduced to a PDF emailed to you. They need to be installed on hospital radiology workstations where doctors can interact with them directly. The software is free and open-source — if your hospital is interested, we can help with setup.',
  },
  {
    question: 'What is the "Coming Soon" model?',
    answer: 'GigaTIME is a virtual immune profiling model published in Cell that can predict 21 immune protein markers from a standard biopsy slide. It requires a whole-slide scanner (~$18,000-22,000) to digitize the biopsy slide. No hospital in the Maldives currently has one. When one does, we will activate this model immediately.',
  },
  {
    question: 'Can my hospital run these models directly?',
    answer: 'Yes — that is our long-term goal. All models on this platform are free and open-source. We want hospitals to adopt these tools directly into their imaging workflows. This platform is a demonstration of what\'s possible. Contact us at info@policylabmv.com for integration support.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[var(--color-border)]">
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-[var(--color-text)] pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[var(--color-text-secondary)] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-5">
          <p className="text-[var(--color-text-secondary)] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <section className="bg-[var(--color-hero-bg)] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <SectionLabel>FAQ</SectionLabel>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Common questions about the platform, privacy, accuracy, and how to use results.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
        <div className="max-w-3xl">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </>
  )
}
