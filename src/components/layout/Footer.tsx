import Link from 'next/link'
import { Activity } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[var(--color-hero-bg)] text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 font-bold text-lg mb-4">
              <Activity className="w-6 h-6 text-[var(--color-primary)]" />
              <span>AIMED</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Open-source medical AI diagnostics, operated as a public service by the Public Policy Lab, Maldives.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-4">Platform</h4>
            <ul className="space-y-2.5">
              <li><Link href="/models" className="text-sm text-gray-400 hover:text-white transition-colors">All Models</Link></li>
              <li><Link href="/analyze/chexpert" className="text-sm text-gray-400 hover:text-white transition-colors">Chest X-Ray Analysis</Link></li>
              <li><Link href="/analyze/sybil" className="text-sm text-gray-400 hover:text-white transition-colors">Lung Cancer Risk</Link></li>
              <li><Link href="/analyze/mirai" className="text-sm text-gray-400 hover:text-white transition-colors">Breast Cancer Risk</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm text-gray-400">info@policylabmv.com</span></li>
              <li>
                <a href="https://new.policylabmv.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  policylabmv.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Public Policy Lab, Maldives. This platform is for research and educational purposes only.
          </p>
          <p className="text-xs text-gray-500">
            Not a medical device. Not cleared by any regulatory body.
          </p>
        </div>
      </div>
    </footer>
  )
}
