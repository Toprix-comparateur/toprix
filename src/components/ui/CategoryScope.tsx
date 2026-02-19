import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const SCOPE_ITEMS = [
  {
    href: '/categories/telephonie',
    label: 'Smartphones',
    sousTitre: 'Toutes les marques',
    img: '/banners/cat-smartphones.webp',
    bg: 'rgb(219, 234, 254)',     // blue-100
    accent: '#1D4ED8',
  },
  {
    href: '/categories/gaming',
    label: 'Gaming',
    sousTitre: 'PC, Consoles & Accessoires',
    img: '/banners/cat-gaming.webp',
    bg: 'rgb(220, 252, 231)',     // green-100
    accent: '#16A34A',
  },
  {
    href: '/categories/electromenager',
    label: 'Électroménager',
    sousTitre: 'Cuisine, Climatisation & Plus',
    img: '/banners/cat-electromenager.webp',
    bg: 'rgb(254, 243, 199)',     // yellow-100
    accent: '#D97706',
  },
]

export default function CategoryScope() {
  return (
    <section className="py-10 sm:py-12 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SCOPE_ITEMS.map(({ href, label, sousTitre, img, bg, accent }) => (
            <Link
              key={href}
              href={href}
              className="group relative rounded-2xl overflow-hidden flex flex-col"
              style={{ backgroundColor: bg, minHeight: '200px' }}
            >
              {/* Contenu texte */}
              <div className="relative z-10 p-5 flex-1">
                <p
                  className="font-heading text-lg font-bold mb-1"
                  style={{ color: accent }}
                >
                  {label}
                </p>
                <p className="text-sm text-slate-600 mb-4">{sousTitre}</p>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  style={{ backgroundColor: `${accent}18`, color: accent }}
                >
                  Explorer <ArrowRight size={11} />
                </span>
              </div>

              {/* Image en bas à droite */}
              <div className="absolute bottom-0 right-0 w-36 h-28 sm:w-40 sm:h-32">
                <Image
                  src={img}
                  alt={label}
                  fill
                  className="object-contain object-bottom group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  sizes="160px"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
