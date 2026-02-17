'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

function CatCard({ href, label, img }: { href: string; label: string; img: string }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl overflow-hidden border border-[#E2E8F0] hover:border-transparent hover:shadow-lg transition-all duration-200"
    >
      <div className="relative h-24 sm:h-28 overflow-hidden bg-[#F8FAFC]">
        <Image
          src={img}
          alt={label}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 44vw, 176px"
        />
      </div>
      <div className="bg-white px-3 py-2.5 flex items-center justify-between">
        <span className="text-[#1E293B] text-xs sm:text-[13px] font-semibold group-hover:text-[#F97316] transition-colors leading-tight">
          {label}
        </span>
        <span className="text-[#CBD5E1] group-hover:text-[#F97316] transition-colors text-xs">›</span>
      </div>
    </Link>
  )
}

export default function CarouselCategories() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft]   = useState(false)
  const [canRight, setCanRight] = useState(true)

  const update = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    return () => el.removeEventListener('scroll', update)
  }, [update])

  return (
    <>
      {/* ── Mobile : grille 2 colonnes ── */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {CATEGORIES.map(c => <CatCard key={c.href} {...c} />)}
      </div>

      {/* ── Desktop : carrousel avec flèches ── */}
      <div className="relative hidden sm:block">
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: -500, behavior: 'smooth' })}
          aria-label="Précédent"
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E2E8F0] shadow-md hover:border-[#F97316] hover:text-[#F97316] transition-all duration-150 ${canLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={scrollRef}
          className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {CATEGORIES.map(c => (
              <div key={c.href} className="w-44 shrink-0">
                <CatCard {...c} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 500, behavior: 'smooth' })}
          aria-label="Suivant"
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#E2E8F0] shadow-md hover:border-[#F97316] hover:text-[#F97316] transition-all duration-150 ${canRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </>
  )
}
