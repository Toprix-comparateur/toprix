import type { Metadata } from 'next'
import Link from 'next/link'
import { Search, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Toprix - Comparateur de pièces automobiles',
  description: 'Comparez les prix des pièces automobiles parmi toutes les boutiques en Tunisie.',
}

const STATS = [
  { valeur: '50 000+', label: 'Produits' },
  { valeur: '120+',    label: 'Marques'  },
  { valeur: '80+',     label: 'Boutiques'},
]

const CATEGORIES_RAPIDES = [
  { href: '/categories/freinage',    label: 'Freinage',    icon: '🛞' },
  { href: '/categories/filtration',  label: 'Filtration',  icon: '🔩' },
  { href: '/categories/eclairage',   label: 'Éclairage',   icon: '💡' },
  { href: '/categories/moteur',      label: 'Moteur',      icon: '⚙️' },
  { href: '/categories/suspension',  label: 'Suspension',  icon: '🔧' },
  { href: '/categories/carrosserie', label: 'Carrosserie', icon: '🚗' },
  { href: '/categories/electricite', label: 'Électricité', icon: '⚡' },
  { href: '/categories',             label: 'Tout voir',   icon: '→'  },
]

const MARQUES_POPULAIRES = [
  'Toyota', 'Volkswagen', 'Renault', 'Peugeot',
  'BMW', 'Mercedes', 'Citroën', 'Ford',
  'Kia', 'Hyundai', 'Fiat', 'Opel',
]

const AVANTAGES = [
  'Comparez les prix en temps réel',
  'Plus de 80 boutiques référencées',
  'Trouvez la pièce exacte en secondes',
]

export default function AccueilPage() {
  return (
    <div className="bg-white">

      {/* HERO */}
      <section className="relative bg-[#0F172A] overflow-hidden" style={{ minHeight: '540px' }}>

        {/* Grille décorative */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Halos orange */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#F97316] rounded-full blur-[120px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 -left-16 w-64 h-64 bg-[#F97316] rounded-full blur-[100px] opacity-10 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-28 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            <Zap size={11} />
            Comparateur n°1 en Tunisie
          </div>

          {/* Titre */}
          <h1 className="font-heading text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight">
            Trouvez la pièce auto<br />
            <span className="text-[#F97316]">au meilleur prix</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Comparez instantanément les offres de toutes les boutiques auto en Tunisie.
          </p>

          {/* Barre de recherche */}
          <form
            action="/rechercher"
            method="get"
            className="flex items-center bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/40 max-w-2xl mx-auto mb-12"
          >
            <div className="flex items-center gap-3 flex-1 px-5">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                type="text"
                name="q"
                placeholder="Ex : filtre à huile, disque de frein..."
                className="w-full py-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="shrink-0 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold text-sm px-6 py-4 transition-colors"
            >
              Comparer
            </button>
          </form>

          {/* Avantages */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {AVANTAGES.map((a) => (
              <div key={a} className="flex items-center gap-2 text-slate-400 text-sm">
                <CheckCircle2 size={14} className="text-[#F97316] shrink-0" />
                {a}
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-white/[0.03]">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-center gap-10 sm:gap-16">
            {STATS.map(({ valeur, label }) => (
              <div key={label} className="text-center">
                <p className="font-heading text-white text-xl font-bold">{valeur}</p>
                <p className="text-slate-500 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="bg-[#F8FAFC] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-1">Explorer</p>
              <h2 className="font-heading text-[#0F172A] text-2xl md:text-3xl">
                Catégories populaires
              </h2>
            </div>
            <Link
              href="/categories"
              className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#F97316] transition-colors"
            >
              Tout voir <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES_RAPIDES.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col items-center justify-center gap-2 bg-white rounded-xl p-4 border border-[#E2E8F0] hover:border-[#F97316] hover:shadow-md transition-all"
              >
                <span className="text-2xl">{icon}</span>
                <span className="text-xs font-medium text-[#1E293B] group-hover:text-[#F97316] text-center transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUES */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-1">Référencées</p>
              <h2 className="font-heading text-[#0F172A] text-2xl md:text-3xl">
                Marques disponibles
              </h2>
            </div>
            <Link
              href="/marques"
              className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#F97316] transition-colors"
            >
              Voir toutes <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {MARQUES_POPULAIRES.map((marque) => (
              <Link
                key={marque}
                href={`/marques/${marque.toLowerCase()}`}
                className="flex items-center justify-center bg-white border border-[#E2E8F0] rounded-xl py-4 px-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:border-slate-300 hover:shadow-sm transition-all"
              >
                {marque}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOUTIQUE */}
      <section className="bg-[#0F172A] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-white text-2xl md:text-3xl mb-3">
            Vous avez une boutique auto ?
          </h2>
          <p className="text-slate-400 mb-8">
            Référencez vos produits gratuitement et touchez des milliers de clients.
          </p>
          <Link
            href="/ajouter"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
          >
            Ajouter ma boutique <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}
