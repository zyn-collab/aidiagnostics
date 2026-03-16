import Link from 'next/link'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline'
  href?: string
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant = 'primary', href, children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-lg transition-colors'
  const variants = {
    primary: 'px-6 py-3 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)]',
    secondary: 'px-6 py-3 bg-[var(--color-hero-bg)] text-white hover:bg-[#2a2d35]',
    outline: 'px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg-subtle)]',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
