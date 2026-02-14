import type { Metadata } from 'next'
import PageHero from '@/components/ui/PageHero'
import { Zap, Search, ShoppingBag, TrendingUp } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'À propos de Toprix',
  description: 'Toprix est le premier comparateur de produits high-tech en Tunisie.',
}

const VALEURS = [
  { icon: Search,      titre: 'Transparence',    desc: 'Tous les prix, toutes les boutiques, en temps réel.' },
  { icon: Zap,         titre: 'Rapidité',        desc: 'Trouvez la meilleure offre en quelques secondes.' },
  { icon: ShoppingBag, titre: 'Large catalogue', desc: '+50 000 produits high-tech référencés.' },
  { icon: TrendingUp,  titre: 'Économies',       desc: "Comparez et économisez jusqu'à 30% sur vos achats." },
]

export default function AProposPage() {
  return (
    <div>
      <PageHero
        surtitre="À propos"
        titre="Toprix, c'est quoi ?"
        sousTitre="Le premier comparateur de produits high-tech en Tunisie."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[#F97316] text-xs font-semibold uppercase tracking-widest mb-2">Notre mission</p>
            <h2 className="font-heading text-[#0F172A] text-2xl md:text-3xl font-bold mb-4">
              Acheter mieux, dépenser moins
            </h2>
            <p className="text-[#64748B] text-sm leading-relaxed mb-4">
              Toprix compare en temps réel les prix de centaines de boutiques en ligne tunisiennes
              pour vous permettre de trouver le meilleur deal sur vos produits high-tech — 
              smartphones, laptops, écrans, audio, gaming et bien plus.
            </p>
            <p className="text-[#64748B] text-sm leading-relaxed">
              Notre service est entièrement gratuit pour les consommateurs. Nous ne touchons 
              pas de commission sur les ventes et notre seul objectif est votre satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {VALEURS.map(({ icon: Icon, titre, desc }) => (
              <div key={titre} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
                <div className="w-8 h-8 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-3">
                  <Icon size={15} className="text-[#F97316]" />
                </div>
                <p className="font-heading font-semibold text-[#0F172A] text-sm mb-1">{titre}</p>
                <p className="text-[#64748B] text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0F172A] rounded-2xl p-8 text-center">
          <h2 className="font-heading text-white text-xl font-bold mb-2">
            Vous avez une boutique high-tech ?
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Rejoignez Toprix gratuitement et touchez des milliers d'acheteurs.
          </p>
          <a
            href="/ajouter"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA6C0A] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
          >
            Référencer ma boutique
          </a>
        </section>
      </div>
    </div>
  )
}
