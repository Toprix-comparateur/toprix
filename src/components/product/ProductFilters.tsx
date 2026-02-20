'use client'

import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X, Tag } from 'lucide-react'

interface ProductFiltersProps {
  // Valeurs actuelles des filtres
  marque?: string
  prix_min?: string
  prix_max?: string
  en_promo?: boolean

  // Compteur de filtres actifs
  nbFiltresActifs?: number

  // Masquer certains filtres
  hideCategorie?: boolean
  hideBrand?: boolean

  // Préserver certains params (ex: categorie pour pages catégories)
  preserveParams?: Record<string, string>
}

export default function ProductFilters({
  marque = '',
  prix_min = '',
  prix_max = '',
  en_promo = false,
  nbFiltresActifs = 0,
  hideCategorie = false,
  hideBrand = false,
  preserveParams = {},
}: ProductFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState(nbFiltresActifs > 0)

  const hasFilters = !!(marque || prix_min || prix_max || en_promo)

  // Construire URL avec filtres
  const buildFilterUrl = (exclude: string[] = []) => {
    const sp = new URLSearchParams()

    // Préserver les params requis
    Object.entries(preserveParams).forEach(([key, value]) => {
      if (value && !exclude.includes(key)) {
        sp.set(key, value)
      }
    })

    // Ajouter les filtres
    if (marque && !exclude.includes('marque')) sp.set('marque', marque)
    if (prix_min && !exclude.includes('prix_min')) sp.set('prix_min', prix_min)
    if (prix_max && !exclude.includes('prix_max')) sp.set('prix_max', prix_max)
    if (en_promo && !exclude.includes('en_promo')) sp.set('en_promo', '1')

    return `${pathname}?${sp.toString()}`
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const sp = new URLSearchParams()

    // Préserver params
    Object.entries(preserveParams).forEach(([key, value]) => {
      if (value) sp.set(key, value)
    })

    // Filtres
    const marqueVal = formData.get('marque') as string
    const prixMinVal = formData.get('prix_min') as string
    const prixMaxVal = formData.get('prix_max') as string
    const enPromoVal = formData.get('en_promo') as string

    if (marqueVal) sp.set('marque', marqueVal)
    if (prixMinVal) sp.set('prix_min', prixMinVal)
    if (prixMaxVal) sp.set('prix_max', prixMaxVal)
    if (enPromoVal === '1') sp.set('en_promo', '1')

    router.push(`${pathname}?${sp.toString()}`)
  }

  const handleClearAll = () => {
    const sp = new URLSearchParams()
    Object.entries(preserveParams).forEach(([key, value]) => {
      if (value) sp.set(key, value)
    })
    router.push(`${pathname}?${sp.toString()}`)
  }

  return (
    <div className="mb-6">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 border border-[#E2E8F0] text-[#64748B] text-sm px-4 py-2 rounded-lg hover:border-[#F97316]/40 hover:text-[#1E293B] transition-colors select-none"
      >
        <SlidersHorizontal size={14} />
        Filtrer
        {nbFiltresActifs > 0 && (
          <span className="ml-0.5 bg-[#F97316] text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {nbFiltresActifs}
          </span>
        )}
      </button>

      {/* Filter form */}
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-3 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-wrap items-end gap-4"
        >
          {/* Marque */}
          {!hideBrand && (
            <div className="flex flex-col gap-1">
              <label htmlFor="filter-marque" className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                Marque
              </label>
              <input
                id="filter-marque"
                type="text"
                name="marque"
                defaultValue={marque}
                placeholder="Ex : Samsung, HP, Sony…"
                className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors min-w-[180px]"
              />
            </div>
          )}

          {/* Prix */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
              Prix (TND)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="prix_min"
                defaultValue={prix_min}
                placeholder="Min"
                min="0"
                className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors w-24"
              />
              <span className="text-slate-400 text-sm">—</span>
              <input
                type="number"
                name="prix_max"
                defaultValue={prix_max}
                placeholder="Max"
                min="0"
                className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors w-24"
              />
            </div>
          </div>

          {/* En promotion */}
          <div className="flex flex-col gap-1 justify-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="en_promo"
                value="1"
                defaultChecked={en_promo}
                className="w-4 h-4 rounded accent-[#F97316] cursor-pointer"
              />
              <span className="text-sm text-[#1E293B] font-medium flex items-center gap-1.5">
                <Tag size={13} className="text-[#F97316]" />
                En promotion
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pb-0.5 ml-auto">
            <button
              type="submit"
              className="bg-[#F97316] hover:bg-[#EA6C0A] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Appliquer
            </button>
            {hasFilters && (
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#1E293B] px-3 py-2 rounded-lg border border-[#E2E8F0] hover:border-slate-300 transition-colors bg-white"
              >
                <X size={13} />
                Effacer
              </button>
            )}
          </div>
        </form>
      )}

      {/* Active filter badges */}
      {hasFilters && (
        <div className="mt-2 flex flex-wrap gap-2">
          {marque && (
            <a
              href={buildFilterUrl(['marque'])}
              className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full hover:opacity-70 transition-opacity"
            >
              Marque : {marque}
              <X size={10} />
            </a>
          )}
          {(prix_min || prix_max) && (
            <a
              href={buildFilterUrl(['prix_min', 'prix_max'])}
              className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full hover:opacity-70 transition-opacity"
            >
              Prix :{' '}
              {prix_min && prix_max
                ? `${prix_min} — ${prix_max} TND`
                : prix_min
                  ? `≥ ${prix_min} TND`
                  : `≤ ${prix_max} TND`}
              <X size={10} />
            </a>
          )}
          {en_promo && (
            <a
              href={buildFilterUrl(['en_promo'])}
              className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full hover:opacity-70 transition-opacity"
            >
              <Tag size={10} />
              En promotion
              <X size={10} />
            </a>
          )}
        </div>
      )}
    </div>
  )
}
