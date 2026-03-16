'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Activity } from 'lucide-react'

const navLinks = [
  { href: '/models', label: 'Models' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/faq', label: 'FAQ' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--color-border)]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-[var(--color-text)]">
          <Activity className="w-6 h-6 text-[var(--color-primary)]" />
          <span>AIMED</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/models"
            className="text-sm font-semibold px-5 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Start Analysis
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-[var(--color-text)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/models"
            className="block text-sm font-semibold px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-center hover:bg-[var(--color-primary-dark)]"
            onClick={() => setMobileOpen(false)}
          >
            Start Analysis
          </Link>
        </div>
      )}
    </header>
  )
}
