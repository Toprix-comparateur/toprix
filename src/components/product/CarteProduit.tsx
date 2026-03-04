import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Produit } from '@/types'

interface CarteProduitProps {
  produit: Produit
  className?: string
  compact?: boolean
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

export default function CarteProduit({ produit, className, compact }: CarteProduitProps) {
  const href = `/produit/${produit.id}`
  const storeKey = (produit.boutique ?? '').toLowerCase()
  const storeClass = STORE_COLORS[storeKey] ?? 'bg-slate-50 text-slate-500 border-slate-100'
  const hasDiscount = (produit.discount ?? 0) > 0
  const hasOldPrice = !!(produit.prix_max && produit.prix_min && produit.prix_max > produit.prix_min)
  const pourcent = (hasDiscount && produit.prix_max && produit.prix_max > 0)
    ? Math.round(((produit.prix_max - (produit.prix_min ?? 0)) / produit.prix_max) * 100)
    : 0

  return (
    <Link
      href={href}
      className={`group flex flex-col bg-white border border-[#E2E8F0] overflow-hidden hover:border-[#F97316]/40 hover:shadow-lg hover:shadow-orange-100/30 transition-all ${compact ? 'rounded-xl' : 'rounded-2xl'}${className ? ` ${className}` : ''}`}
    >
      {/* Image — aspect-ratio responsive */}
      <div className={`relative w-full bg-white overflow-hidden ${compact ? 'aspect-[4/3]' : 'aspect-[4/3]'}`}>
        {produit.image ? (
          <Image
            src={produit.image}
            alt={produit.nom}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-contain group-hover:scale-105 transition-transform duration-300 ${compact ? 'p-1.5' : 'p-3'}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">⚙️</div>
        )}
        {hasDiscount && (
          <span className={`absolute top-1.5 left-1.5 bg-[#F97316] text-white font-bold rounded-md shadow-sm ${compact ? 'text-[9px] px-1.5 py-px' : 'text-xs px-2 py-0.5'}`}>
            -{pourcent > 0 ? `${pourcent}%` : `${produit.discount} DT`}
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className={`flex flex-col flex-1 ${compact ? 'px-1.5 py-1' : 'p-3 sm:p-4'}`}>
        {/* Marque + Store */}
        <div className="flex items-center justify-between mb-0.5 gap-1">
          <p className={`text-[#F97316] font-semibold uppercase tracking-wide truncate ${compact ? 'text-[8px]' : 'text-[10px]'}`}>
            {produit.marque}
          </p>
          {produit.boutique && (
            <span className={`flex items-center rounded-full border ${storeClass} shrink-0 ${compact ? 'px-1 py-px' : 'px-1.5 py-0.5'}`}>
              {STORE_LOGOS[storeKey] ? (
                <Image
                  src={STORE_LOGOS[storeKey]}
                  alt={produit.boutique}
                  width={compact ? 32 : 52}
                  height={compact ? 10 : 16}
                  className={`object-contain w-auto ${compact ? 'h-2' : 'h-3.5 sm:h-4'}`}
                />
              ) : (
                <span className={`font-semibold ${compact ? 'text-[8px]' : 'text-xs'}`}>{produit.boutique}</span>
              )}
            </span>
          )}
        </div>

        <p className={`font-heading font-semibold text-[#0F172A] leading-snug flex-1 ${compact ? 'text-[9px] line-clamp-1' : 'text-xs sm:text-sm line-clamp-2'}`}>
          {produit.nom}
        </p>

        {/* Stock — masqué en compact */}
        {!compact && produit.en_stock !== undefined && (
          <p className={`text-xs font-medium mt-1 ${produit.en_stock ? 'text-green-600' : 'text-red-400'}`}>
            {produit.en_stock ? '● En stock' : '○ Rupture'}
          </p>
        )}

        {/* Prix */}
        <div className={`flex items-center justify-between border-t border-[#E2E8F0] ${compact ? 'mt-0.5 pt-0.5' : 'mt-2.5 pt-2.5'}`}>
          {produit.prix_min ? (
            <div>
              {hasOldPrice && (
                <p className={`text-[#94A3B8] line-through leading-none mb-0.5 ${compact ? 'text-[8px]' : 'text-[10px]'}`}>
                  {produit.prix_max} DT
                </p>
              )}
              <p className={`font-heading text-[#F97316] font-bold leading-none ${compact ? 'text-[11px]' : 'text-base sm:text-lg'}`}>
                {produit.prix_min} <span className={compact ? 'text-[9px]' : 'text-sm'}>DT</span>
              </p>
              {hasDiscount && (
                <p className={`text-green-600 font-semibold mt-0.5 ${compact ? 'text-[8px]' : 'text-[10px]'}`}>
                  -{pourcent > 0 ? `${pourcent}%` : `${produit.discount} DT`}
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-[#64748B]">—</p>
          )}
          {!compact && (
            <div className="w-9 h-9 rounded-full bg-[#F97316]/10 flex items-center justify-center group-hover:bg-[#F97316] transition-colors shrink-0">
              <ArrowRight size={14} className="text-[#F97316] group-hover:text-white transition-colors" />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
