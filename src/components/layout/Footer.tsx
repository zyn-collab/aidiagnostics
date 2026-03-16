import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-8">
      <div className="max-w-[960px] mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-text-secondary)]">
          <Link href="/about" className="hover:text-[var(--color-text)]">About</Link>
          <Link href="/privacy" className="hover:text-[var(--color-text)]">Privacy</Link>
          <Link href="/faq" className="hover:text-[var(--color-text)]">FAQ</Link>
          <a href="https://new.policylabmv.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text)]">policylabmv.com</a>
          <span>info@policylabmv.com</span>
        </div>
        <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
          &copy; {new Date().getFullYear()} Public Policy Lab, Maldives. Research and educational use only. Not a medical device.
        </p>
      </div>
    </footer>
  )
}
