import type { Metadata } from 'next'
import Link from 'next/link'
import { getProduits } from '@/lib/api/produits'
import CarouselEdito from '@/components/ui/CarouselEdito'
import CarouselProduits from '@/components/ui/CarouselProduits'
import { ArrowRight, CheckCircle2, Zap, ThermometerSun, Wind, Tag } from 'lucide-react'

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
  { icon: '📐', titre: 'Choisir la puissance', desc: '9 000 BTU jusqu\'à 15 m² · 12 000 BTU jusqu\'à 20 m² · 18 000 BTU jusqu\'à 30 m²' },
  { icon: '⚡', titre: 'Inverter vs On/Off', desc: 'L\'Inverter consomme 30-50 % moins. Idéal pour un usage quotidien en Tunisie.' },
  { icon: '🌡️', titre: 'Tropicalisé', desc: 'Indispensable en Tunisie pour fonctionner à 46°C extérieur sans panne.' },
  { icon: '❄️', titre: 'Chaud/Froid', desc: 'Modèle réversible : climatise en été, chauffe en hiver. Deux appareils en un.' },
]

const MARQUES = ['Gree', 'LG', 'Samsung', 'Coala', 'Sharp', 'Bosch', 'Tornado', 'Orient']

const FAQ = [
  {
    q: 'Quel climatiseur choisir en Tunisie ?',
    r: 'Pour un usage résidentiel en Tunisie, privilégiez un modèle Inverter tropicalisé entre 9 000 et 18 000 BTU selon la superficie de la pièce. Les marques Gree, LG et Samsung offrent le meilleur rapport qualité/prix.',
  },
  {
    q: 'Quelle est la différence entre un climatiseur On/Off et Inverter ?',
    r: 'Le climatiseur Inverter ajuste sa puissance en continu, ce qui le rend 30 à 50 % plus économique en énergie. Le modèle On/Off fonctionne à pleine puissance ou s\'arrête, consommant plus d\'électricité.',
  },
  {
    q: 'Combien coûte un climatiseur en Tunisie ?',
    r: 'Les prix varient de 800 TND pour un modèle entrée de gamme à plus de 3 000 TND pour un Inverter haute gamme. Comparez les offres en temps réel sur Toprix pour trouver le meilleur prix.',
  },
]

export default async function ClimatiseursPage() {
  const [produitsRes, promosRes] = await Promise.allSettled([
    getProduits({ categorie: 'electromenager/climatisation' }),
    getProduits({ categorie: 'electromenager/climatisation', en_promo: true }),
  ])

  const produits = produitsRes.status === 'fulfilled' ? produitsRes.value.data.slice(0, 20) : []
  const promos   = promosRes.status   === 'fulfilled' ? promosRes.value.data.slice(0, 16)  : []

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, r }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: r } })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* ══════════════ HERO ══════════════════════════════════════════════════ */}
      <section className="relative bg-[#0F172A] overflow-hidden min-h-[420px] flex flex-col justify-center">

        {/* Fond animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0C4A6E] via-[#0F172A] to-[#0F172A]" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#38BDF8] via-[#0EA5E9] to-[#7DD3FC]" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#0EA5E9] rounded-full blur-[160px] opacity-15 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#38BDF8] rounded-full blur-[100px] opacity-10 pointer-events-none" />

        {/* Emoji décoratif */}
        <div className="absolute right-4 sm:right-16 top-1/2 -translate-y-1/2 text-[120px] sm:text-[180px] opacity-10 select-none pointer-events-none leading-none">
          ❄️
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 w-full">
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0EA5E9]/20 border border-[#38BDF8]/30 text-[#7DD3FC] text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest">
              <ThermometerSun size={11} /> Sélection Été 2026
            </div>

            <h1 className="font-heading text-white text-4xl sm:text-6xl font-extrabold leading-[1.05] mb-5">
              Clima&shy;tiseurs<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#7DD3FC]">
                meilleurs prix
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
              Split · Inverter · Chaud/Froid · Tropicalisé<br className="hidden sm:block" />
              Comparez en temps réel chez Mytek, Tunisianet et Spacenet.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/categories/electromenager/climatisation"
                className="inline-flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-[#0EA5E9]/25">
                Voir tous les climatiseurs <ArrowRight size={15} />
              </Link>
              <Link href="/rechercher?q=climatiseur&en_promo=1"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-[#38BDF8] text-slate-300 hover:text-white text-sm font-medium px-5 py-3 rounded-xl transition-all">
                <Tag size={13} /> Promotions
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { val: '116+', label: 'Modèles' },
                { val: '3', label: 'Boutiques' },
                { val: '800–3 500', label: 'TND' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="font-heading text-white text-2xl font-bold">{val}</p>
                  <p className="text-slate-500 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ GUIDE ACHAT ═══════════════════════════════════════════ */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-[#0EA5E9] text-xs font-bold uppercase tracking-widest mb-4">Guide d&apos;achat</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GUIDE.map(({ icon, titre, desc }) => (
              <div key={titre} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 hover:border-[#BAE6FD] hover:bg-[#F0F9FF] transition-all">
                <div className="text-2xl mb-2">{icon}</div>
                <p className="font-semibold text-[#0F172A] text-sm mb-1">{titre}</p>
                <p className="text-[#64748B] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {/* ══════════════ PROMOS ════════════════════════════════════════════════ */}
        {promos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-1 h-8 bg-[#F97316] rounded-full" />
                <div>
                  <p className="text-[#F97316] text-[10px] font-bold uppercase tracking-widest">Offres limitées</p>
                  <h2 className="font-heading text-[#0F172A] text-xl sm:text-2xl">Climatiseurs en promotion</h2>
                </div>
              </div>
              <Link href="/rechercher?q=climatiseur&en_promo=1"
                className="hidden sm:flex items-center gap-1 text-sm text-slate-500 hover:text-[#F97316] transition-colors">
                Tout voir <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselEdito produits={promos} />
          </section>
        )}

        {/* ══════════════ CATALOGUE ═════════════════════════════════════════════ */}
        {produits.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-1 h-8 bg-[#0EA5E9] rounded-full" />
                <div>
                  <p className="text-[#0EA5E9] text-[10px] font-bold uppercase tracking-widest">Catalogue complet</p>
                  <h2 className="font-heading text-[#0F172A] text-xl sm:text-2xl">Tous les climatiseurs</h2>
                </div>
              </div>
              <Link href="/categories/electromenager/climatisation"
                className="hidden sm:flex items-center gap-1 text-sm text-slate-500 hover:text-[#0EA5E9] transition-colors">
                Tout voir <ArrowRight size={13} />
              </Link>
            </div>
            <CarouselProduits produits={produits} />
          </section>
        )}

        {/* ══════════════ MARQUES ═══════════════════════════════════════════════ */}
        <section>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">Par marque</p>
          <div className="flex flex-wrap gap-2">
            {MARQUES.map((m) => (
              <Link key={m} href={`/categories/electromenager/climatisation?marque=${m.toLowerCase()}`}
                className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#475569] hover:border-[#0EA5E9] hover:text-[#0284C7] hover:bg-[#F0F9FF] transition-all shadow-sm">
                {m}
              </Link>
            ))}
          </div>
        </section>

        {/* ══════════════ BANNER CTA ════════════════════════════════════════════ */}
        <section className="relative bg-gradient-to-r from-[#0C4A6E] to-[#0F172A] rounded-3xl overflow-hidden p-8 sm:p-10">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl opacity-20 select-none">🧊</div>
          <p className="text-[#7DD3FC] text-xs font-bold uppercase tracking-widest mb-2">Comparez maintenant</p>
          <h3 className="font-heading text-white text-2xl sm:text-3xl mb-4">Trouvez le meilleur prix<br />en quelques secondes</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/categories/electromenager/climatisation?tri=prix_asc"
              className="inline-flex items-center gap-2 bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
              <Zap size={13} /> Prix croissant
            </Link>
            <Link href="/categories/electromenager/climatisation?en_stock=1"
              className="inline-flex items-center gap-2 border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors">
              <CheckCircle2 size={13} /> En stock
            </Link>
          </div>
        </section>

        {/* ══════════════ LIENS SAISONNIERS ═════════════════════════════════════ */}
        <section>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-4">Voir aussi</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/ete/ventilateurs"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-slate-800 to-[#0F172A] border border-white/10 rounded-2xl p-6 hover:border-[#38BDF8]/50 transition-all">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-15 select-none">🌬️</div>
              <div>
                <p className="text-[#38BDF8] text-xs font-bold uppercase tracking-wide mb-1">Été 2026</p>
                <p className="font-heading text-white text-lg">Ventilateurs</p>
                <p className="text-slate-400 text-sm">Sur pied · Mural · Table · Portatif</p>
              </div>
              <ArrowRight size={18} className="text-slate-500 group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
            <Link href="/ete/climeur"
              className="group relative overflow-hidden flex items-center justify-between bg-gradient-to-r from-emerald-950 to-[#0F172A] border border-white/10 rounded-2xl p-6 hover:border-[#34D399]/50 transition-all">
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
