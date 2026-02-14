import Link from 'next/link'
import { Search, Menu } from 'lucide-react'

const LIENS_NAV = [
  { href: '/categories', label: 'Catégories' },
  { href: '/marques',    label: 'Marques'    },
  { href: '/blog',       label: 'Blog'       },
  { href: '/boutiques',  label: 'Boutiques'  },
]

export default function Header() {
  return (
    <header className="bg-[#0F172A] sticky top-0 z-50 border-b border-white/5">

      {/* ── Bandeau Ramadan ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-amber-900/30 via-amber-700/20 to-amber-900/30 border-b border-amber-400/15">
        <div className="flex items-center justify-center gap-3 py-1.5 text-amber-300 text-xs font-medium tracking-wide">
          <span className="opacity-60 text-[10px]">✦</span>
          <span className="text-base leading-none">🌙</span>
          <span className="font-bold tracking-widest text-amber-200" style={{ fontVariant: 'small-caps' }}>
            Ramadan Mubarak
          </span>
          <span className="text-amber-400/60 text-xs">·</span>
          <span className="font-semibold" style={{ fontFamily: 'serif', letterSpacing: '0.05em' }}>
            رمضان كريم
          </span>
          <span className="text-base leading-none">🌙</span>
          <span className="opacity-60 text-[10px]">✦</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <span className="font-heading text-white text-xl font-700 tracking-tight">
              Top
            </span>
            <span className="font-heading text-[#F97316] text-xl font-700 tracking-tight">
              rix
            </span>
            <span className="text-xs self-start mt-0.5">🇹🇳</span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {LIENS_NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nav-link text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions droite */}
          <div className="flex items-center gap-3">
            <Link
              href="/rechercher"
              aria-label="Rechercher"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 rounded-lg px-3 py-2 text-sm transition-all"
            >
              <Search size={15} strokeWidth={2} />
              <span className="hidden sm:inline">Rechercher</span>
            </Link>

            <Link
              href="/ajouter"
              className="hidden sm:inline-flex bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              + Ajouter
            </Link>

            {/* Mobile menu icon */}
            <button
              className="md:hidden text-slate-300 hover:text-white p-1"
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}
