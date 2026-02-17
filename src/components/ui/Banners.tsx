import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Flame, Tag, Zap } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   1. BannerStats → Hero promo split banner
   Desktop : flex-row   ~ 1200 × 320px  (texte 55% | image 45%)
   Mobile  : flex-col   texte en haut, zone image en bas (~180px)
   ───────────────────────────────────────────────────────────────────────────── */

export function BannerStats() {
  return (
    <div className="overflow-hidden bg-[#0F172A]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row min-h-[200px] sm:min-h-[240px]">

        {/* ── Côté texte ── */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-8 sm:py-0 gap-3 sm:gap-4 relative">

          {/* Ligne décorative verticale */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-16 bg-gradient-to-b from-transparent via-[#F97316] to-transparent hidden sm:block" />

          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full">
              <Flame size={10} strokeWidth={2.5} />
              Offres du moment
            </span>
          </div>

          {/* Titre */}
          <h2 className="font-heading text-white leading-[1.1]">
            <span className="block text-4xl sm:text-5xl font-extrabold">
              Jusqu&apos;à <span className="text-[#F97316]">−40%</span>
            </span>
            <span className="block text-lg sm:text-xl font-medium text-slate-400 mt-1">
              sur tout le High‑Tech
            </span>
          </h2>

          {/* Stores pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {['Mytek', 'Tunisianet', 'Spacenet'].map(s => (
              <span key={s} className="text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                {s}
              </span>
            ))}
            <span className="text-[10px] text-slate-500">· 3 boutiques comparées</span>
          </div>

          {/* CTAs */}
          <div className="flex gap-2 pt-1">
            <Link
              href="/rechercher?en_promo=1"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-orange-900/30"
            >
              <Zap size={12} /> Voir les promos
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-white/25 text-white/70 hover:text-white text-xs font-medium px-4 py-2.5 rounded-xl transition-all"
            >
              Parcourir <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* ── Côté image ── */}
        <div className="sm:w-[42%] relative min-h-[160px] sm:min-h-0 overflow-hidden">
          {/* Gradient de fondu gauche */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0F172A] to-transparent z-10" />

          <Image
            src="/banners/smartphone.webp"
            alt="Smartphones high-tech"
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw, 42vw"
            priority
          />

          {/* Badge promo */}
          <div className="absolute top-4 right-4 z-20 bg-[#F97316] text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-xl rotate-2">
            −40% MAX
          </div>

          {/* Badge marques */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md text-white/80 text-[10px] font-medium px-3 py-1.5 rounded-full border border-white/10">
            <Tag size={8} />
            120+ marques
          </div>
        </div>

      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. BannerHowItWorks → 3 cartes catégories avec zone image
   Chaque carte : zone image h-44 sm:h-48  +  footer 80px
   Desktop : grid-cols-3 (~380 × 340px chacune)
   Mobile  : grid-cols-1 (pleine largeur, scrollable)
   ───────────────────────────────────────────────────────────────────────────── */

const CAT_BANNERS = [
  {
    href: '/categories/ordinateurs-portables',
    label: 'PC Bureau',
    sub: 'Ordinateurs de bureau performants',
    img: '/banners/pc-bureau.webp',
    tag: 'bg-slate-100 text-slate-700',
  },
  {
    href: '/categories/gaming',
    label: 'PC Gaming',
    sub: 'Setup gamer & accessoires',
    img: '/banners/pc-gaming.webp',
    tag: 'bg-purple-50 text-purple-700',
  },
  {
    href: '/categories/ordinateurs-portables',
    label: 'Laptops',
    sub: 'Ordinateurs portables & ultrabooks',
    img: '/banners/laptop.webp',
    tag: 'bg-blue-50 text-blue-700',
  },
  {
    href: '/categories/informatique',
    label: 'Composants PC',
    sub: 'Processeurs, RAM, GPU & stockage',
    img: '/banners/composants-pc.webp',
    tag: 'bg-orange-50 text-orange-700',
  },
]

export function BannerHowItWorks() {
  return (
    <div className="px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-5xl mx-auto">

        {/* Titre */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-1">Explorer</p>
            <h2 className="font-heading text-[#0F172A] text-2xl sm:text-3xl">Catégories phares</h2>
          </div>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-500 hover:text-[#F97316] transition-colors shrink-0 ml-3"
          >
            <span className="hidden sm:inline">Tout voir</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* 4 cartes — desktop grid-cols-4 · mobile grid-cols-2 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          {CAT_BANNERS.map(({ href, label, sub, img, tag }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl overflow-hidden border border-[#E2E8F0] hover:shadow-lg hover:border-transparent transition-all duration-200"
            >
              {/* ── Zone image h-40 mobile · h-44 desktop ── */}
              <div className="relative h-40 sm:h-44 overflow-hidden">
                <Image
                  src={img}
                  alt={label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) calc(100vw - 32px), 300px"
                />
                {/* Overlay bas pour lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                {/* Titre sur l'image */}
                <p className="absolute bottom-3 left-4 text-white font-heading font-bold text-sm z-20 drop-shadow">
                  {label}
                </p>
                {/* Badge "Voir" flottant */}
                <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 z-20">
                  <Zap size={8} /> Voir
                </span>
              </div>

              {/* Pied de carte */}
              <div className="bg-white px-4 py-4 flex items-center justify-between gap-2">
                <div>
                  <p className="font-heading text-[#0F172A] font-semibold text-sm">{label}</p>
                  <p className="text-[#94A3B8] text-xs mt-0.5">{sub}</p>
                </div>
                <span className={`shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full ${tag} flex items-center gap-1`}>
                  Explorer <ArrowRight size={9} />
                </span>
              </div>
            </Link>
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
