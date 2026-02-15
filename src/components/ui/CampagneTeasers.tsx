import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const TEASERS = [
  {
    titre: 'Offres Ramadan',
    sous_titre: "Jusqu'à -40% sur tous les produits high-tech",
    cta: 'Voir les offres',
    href: '/rechercher?en_promo=1',
    gradient: 'linear-gradient(135deg, #F97316, #C2410C)',
    icon: '🌙',
    badge: 'Promo exclusive',
  },
  {
    titre: 'Nouvelles arrivées',
    sous_titre: 'Smartphones & Laptops 2026 déjà disponibles',
    cta: 'Découvrir',
    href: '/categories/smartphones',
    gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
    icon: '✨',
    badge: 'Nouveautés',
  },
]

export default function CampagneTeasers() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {TEASERS.map(({ titre, sous_titre, cta, href, gradient, icon, badge }) => (
          <Link
            key={href}
            href={href}
            style={{ background: gradient }}
            className="group relative rounded-2xl overflow-hidden p-5 sm:p-6 flex items-center justify-between hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            {/* Contenu texte */}
            <div className="relative z-10 min-w-0">
              <span className="inline-block bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2">
                {badge}
              </span>
              <h3 className="font-heading text-white text-base sm:text-lg font-bold mb-1 leading-snug">
                {titre}
              </h3>
              <p className="text-white/75 text-xs sm:text-sm mb-3 leading-snug line-clamp-2">
                {sous_titre}
              </p>
              <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full group-hover:bg-white/30 transition-colors">
                {cta} <ArrowRight size={11} />
              </span>
            </div>

            {/* Emoji décoratif */}
            <div className="text-5xl sm:text-6xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300 shrink-0 ml-4 select-none">
              {icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
