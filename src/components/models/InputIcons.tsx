import type { InputIcon } from '@/lib/models'

const iconLabels: Record<InputIcon, string> = {
  ct: 'CT',
  mri: 'MRI',
  xray: 'X-ray',
  mammogram: 'Mammo',
  fundus: 'Fundus',
  microscope: 'Slide',
  any: 'Any',
}

const iconColors: Record<InputIcon, string> = {
  ct: 'bg-blue-100 text-blue-700 border-blue-200',
  mri: 'bg-purple-100 text-purple-700 border-purple-200',
  xray: 'bg-amber-100 text-amber-700 border-amber-200',
  mammogram: 'bg-pink-100 text-pink-700 border-pink-200',
  fundus: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  microscope: 'bg-rose-100 text-rose-700 border-rose-200',
  any: 'bg-gray-100 text-gray-700 border-gray-200',
}

// Simple SVG icons for each modality
function CTIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="3" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="10" y1="16" x2="10" y2="19" />
      <line x1="1" y1="10" x2="4" y2="10" />
      <line x1="16" y1="10" x2="19" y2="10" />
    </svg>
  )
}

function MRIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="16" height="12" rx="3" />
      <circle cx="10" cy="10" r="3" />
      <line x1="7" y1="10" x2="3" y2="10" />
      <line x1="17" y1="10" x2="13" y2="10" />
    </svg>
  )
}

function XrayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="2" width="14" height="16" rx="2" />
      <ellipse cx="10" cy="8" rx="4" ry="3" />
      <line x1="10" y1="11" x2="10" y2="15" />
      <line x1="7" y1="13" x2="13" y2="13" />
    </svg>
  )
}

function MammoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="2" width="14" height="16" rx="2" />
      <path d="M7 8 Q10 4 13 8 Q13 12 10 13 Q7 12 7 8Z" />
    </svg>
  )
}

function FundusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="10" r="7" />
      <circle cx="10" cy="10" r="2.5" />
      <path d="M3 10 Q6 6 10 7.5" />
      <path d="M17 10 Q14 14 10 12.5" />
    </svg>
  )
}

function MicroscopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="10" cy="7" r="4" />
      <line x1="10" y1="11" x2="10" y2="15" />
      <line x1="6" y1="15" x2="14" y2="15" />
      <rect x="8" y="4" width="4" height="2" rx="0.5" />
    </svg>
  )
}

function AnyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <line x1="3" y1="7" x2="17" y2="7" />
      <circle cx="10" cy="12" r="2" />
    </svg>
  )
}

const iconComponents: Record<InputIcon, React.FC<{ className?: string }>> = {
  ct: CTIcon,
  mri: MRIIcon,
  xray: XrayIcon,
  mammogram: MammoIcon,
  fundus: FundusIcon,
  microscope: MicroscopeIcon,
  any: AnyIcon,
}

export function InputIconBadge({ icon, size = 'sm' }: { icon: InputIcon; size?: 'sm' | 'md' }) {
  const Icon = iconComponents[icon]
  const sizeClasses = size === 'sm'
    ? 'h-6 px-1.5 text-xs gap-1'
    : 'h-8 px-2.5 text-sm gap-1.5'
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4.5 h-4.5'

  return (
    <span className={`inline-flex items-center font-semibold rounded border ${iconColors[icon]} ${sizeClasses}`}>
      <Icon className={iconSize} />
      {iconLabels[icon]}
    </span>
  )
}

export function InputIconGroup({ icons, size = 'sm' }: { icons: InputIcon[]; size?: 'sm' | 'md' }) {
  return (
    <span className="inline-flex items-center gap-1">
      {icons.map((icon) => (
        <InputIconBadge key={icon} icon={icon} size={size} />
      ))}
    </span>
  )
}
