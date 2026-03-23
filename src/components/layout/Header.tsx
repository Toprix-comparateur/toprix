'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'

const LIENS_NAV = [
  { href: '/categories', label: 'Catégories' },
  { href: '/marque',     label: 'Marques'    },
  { href: '/blog',       label: 'Blog'       },
  { href: '/boutiques',  label: 'Boutiques'  },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[#0F172A] sticky top-0 z-50 border-b border-white/5">

      {/* ── Bandeau Aïd ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-emerald-900/30 via-emerald-700/20 to-emerald-900/30 border-b border-emerald-400/15">
        <div className="flex items-center justify-center gap-3 py-1.5 text-emerald-300 text-xs font-medium tracking-wide">
          <span className="opacity-60 text-[10px]">✦</span>
          <span className="text-base leading-none">🌙</span>
          <span className="font-bold tracking-widest text-emerald-200" style={{ fontVariant: 'small-caps' }}>
            Eid Fitr Mubarak 2026
          </span>
          <span className="text-emerald-400/60 text-xs">·</span>
          <span className="font-semibold" style={{ fontFamily: 'serif', letterSpacing: '0.05em' }}>
            عيد الفطر مبارك
          </span>
          <span className="text-base leading-none">🌙</span>
          <span className="opacity-60 text-[10px]">✦</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0" onClick={() => setOpen(false)}>
            <span className="font-heading text-white text-xl font-700 tracking-tight">Top</span>
            <span className="font-heading text-[#F97316] text-xl font-700 tracking-tight">rix</span>
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

            {/* Bouton menu mobile */}
            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden text-slate-300 hover:text-white p-1 transition-colors"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Menu mobile déroulant ─────────────────────────────────────────── */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0F172A]">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {LIENS_NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-slate-300 hover:text-white hover:bg-white/5 text-sm font-medium px-3 py-3 rounded-lg transition-colors"
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t border-white/5">
              <Link
                href="/ajouter"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                + Ajouter ma boutique
              </Link>
            </div>
          </nav>
        </div>
      )}

    </header>
  )
}
