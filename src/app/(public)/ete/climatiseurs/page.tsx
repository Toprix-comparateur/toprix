import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProduits } from '@/lib/api/produits'
import CarteProduit from '@/components/product/CarteProduit'
import { ArrowRight, CheckCircle2, Zap, ThermometerSun } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Climatiseurs Tunisie 2026 — Meilleurs Prix Split & Inverter | Toprix',
  description: 'Comparez les prix des climatiseurs en Tunisie : Split, Inverter, Chaud/Froid. Meilleures offres chez Mytek, Tunisianet et Spacenet.',
  alternates: { canonical: '/ete/climatiseurs' },
  openGraph: {
    title: 'Climatiseurs Tunisie 2026 — Meilleurs Prix | Toprix',
    description: 'Trouvez le meilleur prix pour votre climatiseur en Tunisie.',
    type: 'website',
  },
}

const GUIDE = [
  { icon: '📐', titre: 'Choisir la puissance', desc: '9 000 BTU → chambre jusqu\'à 12 m² · 12 000 BTU → salon 12-18 m² · 18 000 BTU → 18-25 m² · 24 000 BTU → 25-35 m²' },
  { icon: '⚡', titre: 'Inverter vs On/Off', desc: 'L\'Inverter ajuste la puissance en continu et consomme 30 à 40 % moins qu\'un modèle On/Off. Rentabilisé en 2 à 3 saisons.' },
  { icon: '🌡️', titre: 'Tropicalisé obligatoire', desc: 'Indispensable en Tunisie : les modèles tropicalisés fonctionnent jusqu\'à 46°C extérieur sans surchauffe ni panne.' },
  { icon: '❄️', titre: 'Chaud/Froid réversible', desc: 'Climatise en été et chauffe en hiver avec la même unité. Remplace un chauffage électrique et économise sur la facture STEG.' },
]

const BTU_LIENS = [
  { slug: '9000-btu',  label: '9 000 BTU',  desc: 'Jusqu\'à 12 m²',   emoji: '🏠' },
  { slug: '12000-btu', label: '12 000 BTU', desc: 'Jusqu\'à 18 m²',   emoji: '🛋️' },
  { slug: '18000-btu', label: '18 000 BTU', desc: 'Jusqu\'à 25 m²',   emoji: '🏡' },
  { slug: '24000-btu', label: '24 000 BTU', desc: 'Jusqu\'à 35 m²',   emoji: '🏢' },
]

const MARQUE_LIENS = [
  { slug: 'gree',    label: 'Gree',    desc: 'Leader mondial'       },
  { slug: 'midea',   label: 'Midea',   desc: 'Qualité & fiabilité'  },
  { slug: 'saba',    label: 'SABA',    desc: 'Économique'           },
  { slug: 'condor',  label: 'Condor',  desc: 'Robuste & populaire'  },
  { slug: 'biolux',  label: 'Biolux',  desc: 'Marque tunisienne'    },
  { slug: 'lg',      label: 'LG',      desc: 'Dual Inverter WiFi'   },
  { slug: 'tcl',     label: 'TCL',     desc: 'Rapport qualité-prix' },
  { slug: 'samsung', label: 'Samsung', desc: 'WindFree & WiFi'      },
  { slug: 'cristor', label: 'Cristor', desc: 'Économique & fiable'  },
]

const FAQ = [
  {
    q: 'Quel climatiseur choisir en Tunisie en 2026 ?',
    r: 'Choisissez impérativement un modèle Inverter tropicalisé (fonctionnement jusqu\'à 46°C). Pour une chambre, un 9 000 BTU suffit (dès 859 DT). Pour un salon, un 12 000 BTU (999–1 460 DT) ou 18 000 BTU (1 599–2 120 DT). Les marques Gree, LG et Samsung offrent le meilleur rapport qualité/fiabilité.',
  },
  {
    q: 'Combien économise-t-on avec un climatiseur Inverter ?',
    r: 'Un climatiseur Inverter consomme 30 à 40 % moins qu\'un modèle On/Off classique. Sur une saison de 4 mois à raison de 8h/jour, l\'économie représente plusieurs centaines de dinars. L\'Inverter se rentabilise en 2 à 3 saisons malgré son prix d\'achat plus élevé.',
  },
  {
    q: 'Quelle puissance BTU pour mon appartement en Tunisie ?',
    r: '9 000 BTU convient à une chambre jusqu\'à 12 m². 12 000 BTU pour un salon de 12 à 18 m². 18 000 BTU pour 18 à 25 m². 24 000 BTU pour plus de 25 m². Augmentez d\'un palier si la pièce est orientée plein sud, mal isolée ou sous combles.',
  },
  {
    q: 'Faut-il un climatiseur tropicalisé en Tunisie ?',
    r: 'Oui, c\'est indispensable. Un climatiseur standard est conçu pour fonctionner jusqu\'à 43°C. Les étés tunisiens dépassent régulièrement 46°C à l\'extérieur : un modèle non tropicalisé risque de tomber en panne ou de se mettre en sécurité au moment où vous en avez le plus besoin.',
  },
  {
    q: 'Quelle est la différence entre un Split et un Multisplit ?',
    r: 'Un Split comprend une unité intérieure et une unité extérieure, pour climatiser une seule pièce. Un Multisplit relie plusieurs unités intérieures (2 à 5) à une seule unité extérieure : idéal pour climatiser tout un appartement avec une installation unique et moins de perçage de murs.',
  },
]

type Props = { searchParams: Promise<{ page?: string }> }

const BASE = '/ete/climatiseurs'

function Pagination({ page, total }: { page: number; total: number }) {
  if (total <= 1) return null
  const url = (p: number) => p === 1 ? BASE : `${BASE}?page=${p}`
  const getPages = (): (number | '...')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, '...', total]
    if (page >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
    return [1, '...', page - 1, page, page + 1, '...', total]
  }
  return (
    <div className="flex items-center justify-center gap-1.5 pt-10 flex-wrap">
      {page > 1 && (
        <Link href={url(page - 1)} className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors">←</Link>
      )}
      {getPages().map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} className="px-2 text-slate-400 text-sm">…</span>
        ) : (
          <Link key={p} href={url(p as number)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${p === page ? 'bg-[#0EA5E9] text-white font-bold' : 'border border-[#E2E8F0] text-slate-500 hover:border-[#0EA5E9] hover:text-[#0EA5E9]'}`}>
            {p}
          </Link>
        )
      )}
      {page < total && (
        <Link href={url(page + 1)} className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-slate-500 hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors">→</Link>
      )}
    </div>
  )
}

export default async function ClimatiseursPage({ searchParams }: Props) {
  const sp   = await searchParams
  const page = Math.max(1, Number(sp.page) || 1)

  const [produitsRes] = await Promise.allSettled([
    getProduits({ categorie: 'electromenager/climatisation', page }),
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C4A6E] to-[#0F172A]" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#7DD3FC]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 w-full">
          <span className="inline-flex items-center gap-1.5 text-[#7DD3FC] text-xs font-bold uppercase tracking-widest mb-2">
            <ThermometerSun size={10} /> Été 2026
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'white' }}>
            Climatiseurs Tunisie — Meilleurs prix 2026
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Comparez les prix des climatiseurs Split, Inverter et Chaud/Froid en Tunisie — filtrez par puissance BTU et par marque.
          </p>
        </div>
      </section>

      {/* ══════════════ GUIDE ACHAT ═══════════════════════════════════════════ */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-[#0EA5E9] text-xs font-bold uppercase tracking-widest mb-3">Guide d&apos;achat</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GUIDE.map(({ icon, titre, desc }) => (
              <div key={titre} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 hover:border-[#BAE6FD] hover:bg-[#F0F9FF] transition-all">
                <div className="text-xl mb-1.5">{icon}</div>
                <p className="font-semibold text-[#0F172A] text-xs mb-1">{titre}</p>
                <p className="text-[#64748B] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">

        {/* ══════════════ PAR PUISSANCE BTU ══════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-6 bg-[#0EA5E9] rounded-full" />
            <div>
              <p className="text-[#0EA5E9] text-[10px] font-bold uppercase tracking-widest">Maillage par puissance</p>
              <h2 className="font-heading text-[#0F172A] text-lg">Climatiseurs par BTU</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BTU_LIENS.map(({ slug, label, desc, emoji }) => (
              <Link key={slug} href={`${BASE}/${slug}`}
                className="group flex flex-col bg-white border border-[#E2E8F0] rounded-xl p-4 hover:border-[#0EA5E9] hover:shadow-sm transition-all">
                <span className="text-2xl mb-2">{emoji}</span>
                <p className="font-bold text-[#0F172A] text-sm group-hover:text-[#0EA5E9] transition-colors">{label}</p>
                <p className="text-[#64748B] text-xs mt-0.5 flex-1">{desc}</p>
                <span className="inline-flex items-center gap-1 text-[#0EA5E9] text-xs font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Voir <ArrowRight size={11} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════════════ PAR MARQUE ══════════════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1 h-6 bg-[#0EA5E9] rounded-full" />
            <div>
              <p className="text-[#0EA5E9] text-[10px] font-bold uppercase tracking-widest">Maillage par marque</p>
              <h2 className="font-heading text-[#0F172A] text-lg">Climatiseurs par marque</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {MARQUE_LIENS.map(({ slug, label, desc }) => (
              <Link key={slug} href={`${BASE}/${slug}`}
                className="group flex flex-col items-center text-center bg-white border border-[#E2E8F0] rounded-xl p-3 hover:border-[#0EA5E9] hover:shadow-sm transition-all">
                <div className="w-14 h-14 flex items-center justify-center mb-1.5 rounded-lg overflow-hidden bg-[#F8FAFC] border border-[#E2E8F0] group-hover:border-[#BAE6FD] transition-colors">
                  <Image
                    src={`/marques/${slug}.png`}
                    alt={`Logo ${label}`}
                    width={56}
                    height={56}
                    className="object-contain p-1"
                  />
                </div>
                <p className="font-bold text-[#0F172A] text-xs group-hover:text-[#0EA5E9] transition-colors">{label}</p>
                <p className="text-[#94A3B8] text-[10px] mt-0.5 leading-tight">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════════════ GRILLE PRODUITS ═══════════════════════════════════════ */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1 h-7 bg-[#0EA5E9] rounded-full" />
            <div>
              <p className="text-[#0EA5E9] text-[10px] font-bold uppercase tracking-widest">Catalogue complet</p>
              <h2 className="font-heading text-[#0F172A] text-lg sm:text-xl">
                Tous les climatiseurs
                {totalItems > 0 && <span className="text-slate-400 text-sm font-normal ml-2">({totalItems})</span>}
              </h2>
            </div>
          </div>

          {produits.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {produits.map((p) => (
                  <CarteProduit key={p.id} produit={p} compact />
                ))}
              </div>
              <Pagination page={page} total={totalPages} />
            </>
          ) : (
            <div className="py-16 text-center">
              <p className="text-slate-400 text-sm">Aucun produit disponible pour le moment.</p>
            </div>
          )}
        </section>

        {/* ══════════════ BANNER CTA ════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-r from-[#0C4A6E] to-[#0F172A] rounded-2xl overflow-hidden p-6 sm:p-8">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-6xl opacity-20 select-none">🧊</div>
          <p className="text-[#7DD3FC] text-xs font-bold uppercase tracking-widest mb-2">Comparez maintenant</p>
          <h3 className="font-heading text-white text-xl sm:text-2xl mb-4">Trouvez le meilleur prix en quelques secondes</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/categories/electromenager/climatisation?tri=prix_asc"
              className="inline-flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors">
              <Zap size={13} /> Prix croissant
            </Link>
            <Link href="/categories/electromenager/climatisation?en_stock=1"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-white/10 transition-colors">
              <CheckCircle2 size={13} /> En stock
            </Link>
          </div>
        </section>

        {/* ══════════════ LIENS SAISONNIERS ═════════════════════════════════════ */}
        <section>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Voir aussi</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/ete/ventilateurs"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-slate-800 to-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-[#38BDF8]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">🌬️</div>
              <div>
                <p className="text-[#38BDF8] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Ventilateurs</p>
                <p className="text-slate-400 text-sm">Sur pied · Mural · Table · Portatif</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
            <Link href="/ete/climeur"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-emerald-950 to-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-[#34D399]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">💦</div>
              <div>
                <p className="text-[#34D399] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Climeurs mobiles</p>
                <p className="text-slate-400 text-sm">Portatif · Évaporatif · Sans installation</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#34D399] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          </div>
        </section>

        {/* ══════════════ FAQ ═══════════════════════════════════════════════════ */}
        <section>
          <p className="text-[#0EA5E9] text-xs font-bold uppercase tracking-widest mb-4">FAQ</p>
          <div className="divide-y divide-[#E2E8F0]">
            {FAQ.map(({ q, r }) => (
              <div key={q} className="py-5">
                <p className="font-semibold text-[#0F172A] text-sm sm:text-base mb-2 flex items-start gap-2">
                  <span className="text-[#0EA5E9] mt-0.5 shrink-0">Q.</span> {q}
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
