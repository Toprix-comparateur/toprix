import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Produit } from '@/types'

interface CarteProduitProps {
  produit: Produit
}

const STORE_COLORS: Record<string, string> = {
  mytek:      'bg-blue-50 border-blue-100',
  tunisianet: 'bg-green-50 border-green-100',
  spacenet:   'bg-purple-50 border-purple-100',
}

const STORE_LOGOS: Record<string, string> = {
  mytek:      '/stores/mytek.png',
  tunisianet: '/stores/tunisianet.png',
  spacenet:   '/stores/spacenet.png',
}

export default function CarteProduit({ produit }: CarteProduitProps) {
  const href = produit.slug ? `/produit/${produit.slug}` : `/produit/${produit.id}`
  const storeKey = (produit.boutique ?? '').toLowerCase()
  const storeClass = STORE_COLORS[storeKey] ?? 'bg-slate-50 text-slate-500 border-slate-100'
  const hasDiscount = (produit.discount ?? 0) > 0
  const hasOldPrice = !!(produit.prix_max && produit.prix_min && produit.prix_max > produit.prix_min)

  return (
    <Link
      href={href}
      className="group flex flex-col bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:border-[#F97316]/40 hover:shadow-lg hover:shadow-orange-100/30 transition-all"
    >
      {/* Image */}
      <div className="relative h-44 bg-[#F8FAFC] flex items-center justify-center overflow-hidden">
        {produit.image ? (
          <Image
            src={produit.image}
            alt={produit.nom}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="text-5xl opacity-20">⚙️</div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-[#F97316] text-white text-xs font-bold px-2 py-0.5 rounded-md">
            -{produit.discount} DT
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-4">
        {/* Marque + Store */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[#F97316] text-xs font-semibold uppercase tracking-wide">
              {produit.marque}
            </p>
          </div>
          {produit.boutique && (
            <span className={`flex items-center px-1.5 py-0.5 rounded-full border ${storeClass}`}>
              {STORE_LOGOS[storeKey] ? (
                <Image
                  src={STORE_LOGOS[storeKey]}
                  alt={produit.boutique}
                  width={52}
                  height={16}
                  className="object-contain h-4 w-auto"
                />
              ) : (
                <span className="text-xs font-semibold">{produit.boutique}</span>
              )}
            </span>
          )}
        </div>

        <p className="font-heading font-semibold text-[#0F172A] text-sm leading-snug line-clamp-2 flex-1">
          {produit.nom}
        </p>

        {/* Stock */}
        {produit.en_stock !== undefined && (
          <p className={`text-xs font-semibold mt-1 ${produit.en_stock ? 'text-green-600' : 'text-red-400'}`}>
            {produit.en_stock ? '● En stock' : '○ Rupture de stock'}
          </p>
        )}

        {/* Prix */}
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-[#E2E8F0]">
          {produit.prix_min ? (
            <div>
              {hasOldPrice && (
                <p className="text-xs text-[#94A3B8] line-through leading-none mb-0.5">
                  {produit.prix_max} DT
                </p>
              )}
              <p className="font-heading text-[#F97316] font-bold text-lg leading-none">
                {produit.prix_min} DT
              </p>
              {hasDiscount && (
                <p className="text-xs text-green-600 font-semibold mt-0.5">
                  Économie : {produit.discount} DT
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-[#64748B]">Prix non disponible</p>
          )}
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center group-hover:bg-[#F97316] transition-colors shrink-0">
            <ArrowRight size={14} className="text-[#F97316] group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
}
