import Link from 'next/link'
import Image from 'next/image'

const CATEGORIES = [
  {
    href: '/categories/smartphones',
    label: 'Smartphones',
    img: '/banners/cat-smartphones.webp',
  },
  {
    href: '/categories/ordinateurs-portables',
    label: 'Laptops',
    img: '/banners/cat-laptops.webp',
  },
  {
    href: '/categories/tablettes',
    label: 'Tablettes',
    img: '/banners/cat-tablettes.webp',
  },
  {
    href: '/categories/audio',
    label: 'Audio',
    img: '/banners/cat-audio.webp',
  },
  {
    href: '/categories/gaming',
    label: 'Gaming',
    img: '/banners/cat-gaming.webp',
  },
  {
    href: '/categories/electromenager',
    label: 'Électroménager',
    img: '/banners/cat-electromenager.webp',
  },
  {
    href: '/categories/photo',
    label: 'Photo & Vidéo',
    img: '/banners/cat-photo.webp',
  },
  {
    href: '/categories/moniteurs',
    label: 'Moniteurs',
    img: '/banners/cat-moniteurs.webp',
  },
]

export default function CarouselCategories() {
  return (
    <div className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-3 sm:gap-4" style={{ width: 'max-content' }}>
        {CATEGORIES.map(({ href, label, img }) => (
          <Link
            key={href}
            href={href}
            className="group shrink-0 w-36 sm:w-44 rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-transparent hover:shadow-lg transition-all duration-200"
          >
            {/* Zone image */}
            <div className="relative h-24 sm:h-28 overflow-hidden bg-[#F8FAFC]">
              <Image
                src={img}
                alt={label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-400"
                sizes="(max-width: 640px) 144px, 176px"
              />
            </div>

            {/* Label */}
            <div className="bg-white px-3 py-2.5 flex items-center justify-between">
              <span className="text-[#1E293B] text-xs sm:text-[13px] font-semibold group-hover:text-[#F97316] transition-colors leading-tight">
                {label}
              </span>
              <span className="text-[#CBD5E1] group-hover:text-[#F97316] transition-colors text-xs">›</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
