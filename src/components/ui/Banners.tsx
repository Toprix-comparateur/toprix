import Link from 'next/link'
import Image from 'next/image'
import {
  Package, Star, Store, TrendingDown,
  Search, BarChart2, ShoppingCart, ArrowRight,
} from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   1. BannerStats — Chiffres clés (entre Top promos et Catégories)
   ───────────────────────────────────────────────────────────────────────────── */

const STATS_ITEMS = [
  { icon: Package,      value: '50 000+', label: 'Produits référencés' },
  { icon: Star,         value: '120+',    label: 'Marques disponibles'  },
  { icon: Store,        value: '3',       label: 'Boutiques partenaires'},
  { icon: TrendingDown, value: '-40%',    label: 'De réduction max'     },
]

export function BannerStats() {
  return (
    <div className="bg-[#0F172A] px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-white/10">
        {STATS_ITEMS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center text-center gap-2 sm:px-8">
            <div className="w-10 h-10 rounded-xl bg-[#F97316]/15 flex items-center justify-center mb-1">
              <Icon size={18} className="text-[#F97316]" />
            </div>
            <p className="font-heading text-white text-2xl sm:text-3xl font-bold">{value}</p>
            <p className="text-slate-400 text-xs leading-snug">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. BannerHowItWorks — Comment ça marche (entre Catégories et Smartphones)
   ───────────────────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    num: '01',
    icon: Search,
    titre: 'Recherchez',
    desc: 'Tapez le nom d\'un produit dans la barre de recherche',
    color: 'bg-blue-50 text-blue-500',
  },
  {
    num: '02',
    icon: BarChart2,
    titre: 'Comparez',
    desc: 'Visualisez les prix de toutes les boutiques en un coup d\'œil',
    color: 'bg-orange-50 text-[#F97316]',
  },
  {
    num: '03',
    icon: ShoppingCart,
    titre: 'Achetez',
    desc: 'Cliquez sur le meilleur prix et finalisez sur le site boutique',
    color: 'bg-green-50 text-green-500',
  },
]

export function BannerHowItWorks() {
  return (
    <div className="px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto">

        {/* Titre */}
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-1">Simple & rapide</p>
          <h2 className="font-heading text-[#0F172A] text-2xl sm:text-3xl">Comment ça marche ?</h2>
        </div>

        {/* Étapes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 relative">

          {/* Connecteurs (desktop uniquement) */}
          <div className="hidden sm:block absolute top-8 left-[calc(33.33%+16px)] right-[calc(33.33%+16px)] h-px bg-dashed border-t-2 border-dashed border-[#E2E8F0]" />

          {STEPS.map(({ num, icon: Icon, titre, desc, color }, i) => (
            <div
              key={num}
              className="relative bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center gap-3 hover:shadow-md hover:border-[#F97316]/30 transition-all"
            >
              {/* Numéro */}
              <span className="absolute -top-3 left-5 bg-[#F97316] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {num}
              </span>

              {/* Icône */}
              <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center`}>
                <Icon size={24} />
              </div>

              <h3 className="font-heading text-[#0F172A] text-base font-semibold">{titre}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{desc}</p>

              {/* Flèche entre étapes (mobile) */}
              {i < STEPS.length - 1 && (
                <ArrowRight size={16} className="text-[#CBD5E1] sm:hidden rotate-90 mt-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. BannerBoutiques — Boutiques partenaires (entre Électroménager et Marques)
   ───────────────────────────────────────────────────────────────────────────── */

const BOUTIQUES = [
  {
    nom: 'Mytek',
    href: '/rechercher?boutique=mytek',
    logo: '/stores/mytek.png',
    badge: 'Informatique & High-Tech',
    color: 'border-blue-100 hover:border-blue-300',
    tag: 'bg-blue-50 text-blue-600',
  },
  {
    nom: 'Tunisianet',
    href: '/rechercher?boutique=tunisianet',
    logo: '/stores/tunisianet.png',
    badge: 'Électronique & Photo',
    color: 'border-green-100 hover:border-green-300',
    tag: 'bg-green-50 text-green-600',
  },
  {
    nom: 'Spacenet',
    href: '/rechercher?boutique=spacenet',
    logo: '/stores/spacenet.png',
    badge: 'Multimédia & Gaming',
    color: 'border-purple-100 hover:border-purple-300',
    tag: 'bg-purple-50 text-purple-600',
  },
]

export function BannerBoutiques() {
  return (
    <div className="bg-[#F8FAFC] px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto">

        {/* Titre */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-1">Partenaires</p>
            <h2 className="font-heading text-[#0F172A] text-2xl sm:text-3xl">Nos boutiques</h2>
          </div>
          <Link
            href="/ajouter"
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#F97316] transition-colors shrink-0 ml-3"
          >
            <span className="hidden sm:inline">Ajouter la vôtre</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Cartes boutiques */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {BOUTIQUES.map(({ nom, href, logo, badge, color, tag }) => (
            <Link
              key={nom}
              href={href}
              className={`group bg-white border ${color} rounded-2xl p-4 sm:p-5 flex flex-col items-center gap-3 hover:shadow-md transition-all`}
            >
              {/* Logo */}
              <div className="w-full h-10 sm:h-12 relative flex items-center justify-center">
                <Image
                  src={logo}
                  alt={nom}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 30vw, 200px"
                />
              </div>

              {/* Badge catégorie */}
              <span className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full ${tag} text-center leading-snug`}>
                {badge}
              </span>

              {/* CTA */}
              <span className="flex items-center gap-1 text-[11px] sm:text-xs text-[#F97316] font-medium group-hover:underline">
                Voir les offres <ArrowRight size={10} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
