import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Produit } from '@/types'

interface CarteProduitProps {
  produit: Produit
}

export default function CarteProduit({ produit }: CarteProduitProps) {
  const href = produit.slug ? `/produit/${produit.slug}` : `/produit/${produit.id}`
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
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[#F97316] text-xs font-semibold uppercase tracking-wide mb-1">
          {produit.marque}
        </p>
        <p className="font-heading font-semibold text-[#0F172A] text-sm leading-snug line-clamp-2 flex-1">
          {produit.nom}
        </p>

        {/* Prix + flèche */}
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-[#E2E8F0]">
          {produit.prix_min ? (
            <div>
              <p className="text-xs text-[#64748B]">À partir de</p>
              <p className="font-heading text-[#F97316] font-bold text-lg leading-none">
                {produit.prix_min} DT
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#64748B]">Prix non disponible</p>
          )}
          <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center group-hover:bg-[#F97316] transition-colors">
            <ArrowRight size={14} className="text-[#F97316] group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  )
}
