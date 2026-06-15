import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduits } from '@/lib/api/produits'
import CarteProduit from '@/components/product/CarteProduit'
import { ArrowRight, CheckCircle2, Zap, Bug, X } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Désinsectiseurs Tunisie 2026 — Meilleurs Prix Lampe UV, Raquette & Ultrasons | Toprix',
  description: 'Comparez les prix des désinsectiseurs en Tunisie : lampe UV, raquette électrique, ultrasons, diffuseur. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
  alternates: { canonical: '/ete/desinsectiseur' },
  openGraph: {
    title: 'Désinsectiseurs Tunisie 2026 — Meilleurs Prix | Toprix',
    description: 'Trouvez le meilleur désinsectiseur au meilleur prix en Tunisie.',
    type: 'website',
  },
}

const GUIDE = [
  { icon: '💡', titre: 'Lampe UV électrocutante', desc: 'Attire les insectes par lumière UV et les neutralise par grille électrique (3 800V). 6W → 10 m² · 16W → 40 m² · 2×20W pro → 430 m². Sans produits chimiques.' },
  { icon: '⚡', titre: 'Raquette électrique', desc: 'Tue instantanément moustiques et mouches par contact. Rechargeable USB, léger (300g). Idéale pour usage ciblé dans la chambre ou le salon.' },
  { icon: '🔊', titre: 'Ultrasons', desc: 'Émet des ondes sonores imperceptibles pour humains mais insupportables pour rongeurs et certains insectes. Sans chimie, sans odeur, plugged-in 24h/24.' },
  { icon: '🌿', titre: 'Diffuseur électrique', desc: 'Diffuse en continu une tablette insecticide ou un liquide. Efficace contre moustiques dans 20 m². Préférez les formules sans allergènes pour les enfants.' },
]

const MARQUES = ['Silverline', 'Geepas', 'Beorol', 'Kinzo']

const FAQ = [
  {
    q: 'Quel désinsectiseur choisir pour une maison en Tunisie ?',
    r: 'Pour une terrasse ou un grand salon (40 m²+), choisissez une lampe UV de 16 à 20W — sans chimie et silencieuse. Pour une chambre, un diffuseur électrique à tablettes ou un répulseur à ultrasons est plus discret. La raquette électrique rechargeable est parfaite pour intervenir rapidement sur un moustique repéré.',
  },
  {
    q: 'Les lampes UV anti-insectes sont-elles vraiment efficaces contre les moustiques ?',
    r: 'Les lampes UV attirent et éliminent efficacement mouches, phalènes et coléoptères. Pour les moustiques (surtout le moustique tigre), leur efficacité est plus limitée : ces insectes sont attirés par le CO₂ et la chaleur corporelle plus que par la lumière UV. Pour les moustiques, combinez lampe UV + répulsif cutané ou moustiquaire.',
  },
  {
    q: 'Où placer une lampe UV désinsectiseur ?',
    r: 'Placez la lampe en hauteur (1,5 à 2 m), à l\'intérieur, à l\'abri de la lumière directe du soleil (qui annule l\'attraction UV). Ne la placez pas directement au-dessus des plats ou des aliments. Allumez-la le soir avant l\'arrivée des insectes, et nettoyez le bac de récupération chaque semaine.',
  },
  {
    q: 'Quel est le prix d\'un désinsectiseur en Tunisie en 2026 ?',
    r: 'Les raquettes électriques USB débutent à 15–25 DT. Les lampes UV de 6W (prise murale) coûtent 20–50 DT, les modèles 16W entre 60 et 120 DT. Les désinsectiseurs professionnels 2×20W (430 m²) atteignent 200–400 DT. Comparez les prix en temps réel sur Toprix.',
  },
  {
    q: 'Les répulseurs à ultrasons sont-ils sûrs pour les animaux de compagnie ?',
    r: 'Les répulseurs à ultrasons pour insectes émettent des fréquences différentes de celles ciblant les rongeurs. Ils sont généralement sans effet sur chiens et chats. Cependant, évitez de les utiliser si vous avez des rongeurs domestiques (hamster, cochon d\'Inde) ou des oiseaux, qui peuvent être perturbés par certaines fréquences.',
  },
]

type SP = { page?: string; marque?: string }
type Props = { searchParams: Promise<SP> }

const BASE = '/ete/desinsectiseur'

function buildUrl(sp: SP, update: Partial<SP>): string {
  const p: Record<string, string> = {}
  const marque = 'marque' in update ? update.marque : sp.marque
  const page   = 'page'   in update ? update.page   : undefined
  if (marque) p.marque = marque
  if (page)   p.page = page
  const qs = new URLSearchParams(p).toString()
  return qs ? `${BASE}?${qs}` : BASE
}

function Pagination({ page, total, sp }: { page: number; total: number; sp: SP }) {
  if (total <= 1) return null
  const getPages = (): (number | '...')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, '...', total]
    if (page >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
    return [1, '...', page - 1, page, page + 1, '...', total]
  }
  return (
    <div className="flex items-center justify-center gap-1.5 pt-10 flex-wrap">
      {page > 1 && (
        <Link href={buildUrl(sp, { page: String(page - 1) })}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors">←</Link>
      )}
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
        ) : (
          <Link key={p} href={buildUrl(sp, { page: String(p) })}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${p === page ? 'bg-[#8B5CF6] text-white font-bold' : 'border border-[#E2E8F0] text-slate-500 hover:border-[#8B5CF6] hover:text-[#8B5CF6]'}`}>
            {p}
          </Link>
        )
      )}
      {page < total && (
        <Link href={buildUrl(sp, { page: String(page + 1) })}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors">→</Link>
      )}
    </div>
  )
}

export default async function DesinsectiseurPage({ searchParams }: Props) {
  const sp = await searchParams
  const page   = Math.max(1, Number(sp.page) || 1)
  const marque = sp.marque || ''

  const [produitsRes] = await Promise.allSettled([
    getProduits({ q: 'desinsectiseur', marque: marque || undefined, page }),
  ])

  const produits   = produitsRes.status === 'fulfilled' ? produitsRes.value.data : []
  const totalPages = produitsRes.status === 'fulfilled' ? (produitsRes.value.meta?.total_pages ?? 1) : 1
  const totalItems = produitsRes.status === 'fulfilled' ? (produitsRes.value.meta?.total_items ?? produits.length) : produits.length

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, r }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: r } })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ══════════════ HERO COMPACT ══════════════════════════════════════════ */}
      <section className="relative bg-[#0F172A] overflow-hidden min-h-[140px] flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4C1D95] to-[#0F172A]" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C4B5FD] via-[#8B5CF6] to-[#DDD6FE]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 w-full">
          <span className="inline-flex items-center gap-1.5 text-[#C4B5FD] text-xs font-bold uppercase tracking-widest mb-2">
            <Bug size={10} /> Été 2026
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'white' }}>
            Désinsectiseurs Tunisie — Meilleurs prix 2026
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Lampe UV, raquette électrique, ultrasons — comparez et filtrez par marque.
          </p>
        </div>
      </section>

      {/* ══════════════ FILTRE MARQUE ══════════════════════════════════════════ */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-2">
          <span className="text-[#64748B] text-[11px] font-bold uppercase tracking-widest w-14 shrink-0">Marque</span>
          {MARQUES.map((m) => {
            const active = marque.toLowerCase() === m.toLowerCase()
            return (
              <Link key={m}
                href={buildUrl(sp, { marque: active ? undefined : m.toLowerCase() })}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-[#8B5CF6] hover:text-white hover:border-[#8B5CF6]'
                }`}>
                {m}
              </Link>
            )
          })}
          {marque && (
            <Link href={BASE}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border border-red-200 bg-red-50 text-red-500 hover:bg-red-100 transition-all ml-1">
              <X size={10} /> Effacer
            </Link>
          )}
        </div>
      </section>

      {/* ══════════════ GUIDE ACHAT ═══════════════════════════════════════════ */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-[#8B5CF6] text-xs font-bold uppercase tracking-widest mb-3">Guide d&apos;achat</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GUIDE.map(({ icon, titre, desc }) => (
              <div key={titre} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 hover:border-[#DDD6FE] hover:bg-[#F5F3FF] transition-all">
                <div className="text-xl mb-1.5">{icon}</div>
                <p className="font-semibold text-[#0F172A] text-xs mb-1">{titre}</p>
                <p className="text-[#64748B] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

        {/* ══════════════ GRILLE PRODUITS ═══════════════════════════════════════ */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="w-1 h-7 bg-[#8B5CF6] rounded-full" />
              <div>
                <p className="text-[#8B5CF6] text-[10px] font-bold uppercase tracking-widest">Catalogue</p>
                <h2 className="font-heading text-[#0F172A] text-lg sm:text-xl">
                  {marque ? `Désinsectiseurs ${marque.charAt(0).toUpperCase() + marque.slice(1)}` : 'Tous les désinsectiseurs'}
                  {totalItems > 0 && <span className="text-slate-400 text-sm font-normal ml-2">({totalItems})</span>}
                </h2>
              </div>
            </div>
            {marque && (
              <Link href={BASE} className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
                <X size={12} /> Réinitialiser
              </Link>
            )}
          </div>

          {produits.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {produits.map((p) => (
                  <CarteProduit key={p.id} produit={p} compact />
                ))}
              </div>
              <Pagination page={page} total={totalPages} sp={sp} />
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-slate-400 text-sm mb-3">Aucun produit trouvé pour ce filtre.</p>
              <Link href={BASE} className="text-[#8B5CF6] text-sm hover:underline">Voir tous les désinsectiseurs</Link>
            </div>
          )}
        </section>

        {/* ══════════════ BANNER CTA ════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-r from-[#4C1D95] to-[#0F172A] rounded-2xl overflow-hidden p-6 sm:p-8">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20 select-none">⚡</div>
          <p className="text-[#C4B5FD] text-xs font-bold uppercase tracking-widest mb-2">Comparez maintenant</p>
          <h3 className="font-heading text-white text-xl sm:text-2xl mb-4">Trouvez le meilleur désinsectiseur au meilleur prix</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/rechercher?q=desinsectiseur&tri=prix_asc"
              className="inline-flex items-center gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors">
              <Zap size={13} /> Prix croissant
            </Link>
            <Link href="/rechercher?q=desinsectiseur&en_stock=1"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-white/10 transition-colors">
              <CheckCircle2 size={13} /> En stock
            </Link>
          </div>
        </section>

        {/* ══════════════ LIENS SAISONNIERS ═════════════════════════════════════ */}
        <section>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Voir aussi</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/ete/climatiseurs"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-[#0C4A6E] to-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-[#38BDF8]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">❄️</div>
              <div>
                <p className="text-[#38BDF8] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Climatiseurs</p>
                <p className="text-slate-400 text-sm">Split · Inverter</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
            <Link href="/ete/ventilateurs"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-[#1E3A5F] to-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-[#93C5FD]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">🌬️</div>
              <div>
                <p className="text-[#93C5FD] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Ventilateurs</p>
                <p className="text-slate-400 text-sm">Sur pied · Mural</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#93C5FD] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
            <Link href="/ete/moustiquaires"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-[#78350F] to-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-[#FCD34D]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">🦟</div>
              <div>
                <p className="text-[#FCD34D] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Moustiquaires</p>
                <p className="text-slate-400 text-sm">Fenêtre · Porte · Lit</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#FCD34D] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>
        </section>

        {/* ══════════════ FAQ ═══════════════════════════════════════════════════ */}
        <section>
          <p className="text-[#8B5CF6] text-xs font-bold uppercase tracking-widest mb-4">FAQ</p>
          <div className="divide-y divide-[#E2E8F0]">
            {FAQ.map(({ q, r }) => (
              <div key={q} className="py-5">
                <p className="font-semibold text-[#0F172A] text-sm sm:text-base mb-2 flex items-start gap-2">
                  <span className="text-[#8B5CF6] mt-0.5 shrink-0">Q.</span> {q}
                </p>
                <p className="text-[#64748B] text-sm leading-relaxed pl-5">{r}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
