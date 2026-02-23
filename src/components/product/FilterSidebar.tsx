'use client'

import { useState } from 'react'
import { X, ChevronDown, SlidersHorizontal, Tag, Package, ArrowUpDown } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterState {
  boutique: string
  marques: string[]
  categorie: string
  prix_min: string
  prix_max: string
  en_promo: boolean
  en_stock: boolean
  tri: string
}

export const EMPTY_FILTERS: FilterState = {
  boutique: '',
  marques: [],
  categorie: '',
  prix_min: '',
  prix_max: '',
  en_promo: false,
  en_stock: false,
  tri: '',
}

export interface FilterSidebarProps {
  filters: FilterState
  onChange: (f: FilterState) => void
  availableBrands: string[]
  hideBrand?: boolean
  hideCategorie?: boolean
  isOpen: boolean
  onClose: () => void
  nbActifs: number
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const BOUTIQUES = [
  { id: 'mytek',      label: 'Mytek',      dot: 'bg-blue-500',   pill: 'bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400',   pillActive: 'bg-blue-600 text-white border-blue-600' },
  { id: 'tunisianet', label: 'Tunisianet', dot: 'bg-green-500',  pill: 'bg-green-50 text-green-700 border-green-200 hover:border-green-400', pillActive: 'bg-green-600 text-white border-green-600' },
  { id: 'spacenet',   label: 'Spacenet',   dot: 'bg-violet-500', pill: 'bg-violet-50 text-violet-700 border-violet-200 hover:border-violet-400', pillActive: 'bg-violet-600 text-white border-violet-600' },
] as const

export const PARENT_CATEGORIES = [
  { slug: 'informatique',      nom: 'Informatique' },
  { slug: 'telephonie',        nom: 'Téléphonie' },
  { slug: 'gaming',            nom: 'Gaming' },
  { slug: 'tv-et-son',         nom: 'TV & Son' },
  { slug: 'electromenager',    nom: 'Électroménager' },
  { slug: 'photo-et-video',    nom: 'Photo & Vidéo' },
  { slug: 'surveillance',      nom: 'Surveillance' },
  { slug: 'energie',           nom: 'Énergie' },
  { slug: 'bureau-et-papeterie', nom: 'Bureau & Papeterie' },
  { slug: 'maison-et-mobilier', nom: 'Maison & Mobilier' },
  { slug: 'beaute-et-sante',   nom: 'Beauté & Santé' },
  { slug: 'sport-et-loisirs',  nom: 'Sport & Loisirs' },
  { slug: 'bebe-et-jouets',    nom: 'Bébé & Jouets' },
]

// ─── Section accordéon ────────────────────────────────────────────────────────

function Section({ title, children, defaultOpen = true }: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#F1F5F9] last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 px-4 text-left hover:bg-[#F8FAFC] transition-colors"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">{title}</span>
        <ChevronDown
          size={14}
          className={`text-[#CBD5E1] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-4 pb-4">{children}</div>}
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function FilterSidebar({
  filters,
  onChange,
  availableBrands,
  hideBrand = false,
  hideCategorie = false,
  isOpen,
  onClose,
  nbActifs,
}: FilterSidebarProps) {
  const [brandSearch, setBrandSearch] = useState('')

  const filteredBrands = brandSearch.trim()
    ? availableBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()))
    : availableBrands

  const handleClear = () => {
    onChange({ ...EMPTY_FILTERS })
    setBrandSearch('')
  }

  return (
    <aside
      className={[
        /* Mobile : tiroir depuis la gauche */
        'fixed top-0 left-0 h-full z-40 w-72 bg-white overflow-y-auto',
        'transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full',
        /* Desktop : sidebar statique sticky */
        'lg:static lg:translate-x-0 lg:shadow-none lg:z-auto',
        'lg:w-56 xl:w-60 lg:max-h-[calc(100vh-5rem)] lg:sticky lg:top-20',
        'lg:rounded-2xl lg:border lg:border-[#E2E8F0] lg:overflow-y-auto',
      ].join(' ')}
    >
      {/* ── Header sidebar ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9] bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-[#F97316]" />
          <span className="font-heading font-bold text-[#0F172A] text-sm">Filtres</span>
          {nbActifs > 0 && (
            <span className="bg-[#F97316] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {nbActifs}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {nbActifs > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-[#F97316] hover:underline font-medium"
            >
              Effacer
            </button>
          )}
          {/* Fermer drawer mobile */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer filtres"
            className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg hover:bg-[#F8FAFC] transition-colors"
          >
            <X size={16} className="text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* ── Section Boutique ── */}
      <Section title="Boutique">
        <div className="flex flex-col gap-1.5">
          {/* Toutes */}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
              !filters.boutique
                ? 'bg-[#0F172A] border-[#0F172A]'
                : 'border-[#CBD5E1] group-hover:border-[#94A3B8]'
            }`}>
              {!filters.boutique && <span className="block w-full h-full rounded-full bg-white scale-[0.35]" />}
            </span>
            <span className={`text-sm font-medium transition-colors ${!filters.boutique ? 'text-[#0F172A]' : 'text-[#64748B] group-hover:text-[#1E293B]'}`}>
              Toutes les boutiques
            </span>
            <input
              type="radio"
              name="boutique"
              value=""
              checked={!filters.boutique}
              onChange={() => onChange({ ...filters, boutique: '' })}
              className="sr-only"
            />
          </label>
          {BOUTIQUES.map((b) => (
            <label key={b.id} className="flex items-center gap-2.5 cursor-pointer group">
              <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                filters.boutique === b.id
                  ? `${b.dot} border-transparent`
                  : 'border-[#CBD5E1] group-hover:border-[#94A3B8]'
              }`}>
                {filters.boutique === b.id && <span className="block w-full h-full rounded-full bg-white scale-[0.35]" />}
              </span>
              <span className={`text-sm font-medium transition-colors ${filters.boutique === b.id ? 'text-[#0F172A]' : 'text-[#64748B] group-hover:text-[#1E293B]'}`}>
                {b.label}
              </span>
              <input
                type="radio"
                name="boutique"
                value={b.id}
                checked={filters.boutique === b.id}
                onChange={() => onChange({ ...filters, boutique: b.id })}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </Section>

      {/* ── Section Catégorie ── */}
      {!hideCategorie && (
        <Section title="Catégorie">
          <div className="flex flex-col gap-1">
            {PARENT_CATEGORIES.map((cat) => (
              <label key={cat.slug} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                  filters.categorie === cat.slug
                    ? 'bg-[#F97316] border-[#F97316]'
                    : 'border-[#CBD5E1] group-hover:border-[#F97316]/50'
                }`}>
                  {filters.categorie === cat.slug && <span className="block w-full h-full rounded-full bg-white scale-[0.35]" />}
                </span>
                <span className={`text-sm transition-colors leading-tight ${
                  filters.categorie === cat.slug ? 'text-[#0F172A] font-semibold' : 'text-[#64748B] group-hover:text-[#1E293B]'
                }`}>
                  {cat.nom}
                </span>
                <input
                  type="radio"
                  name="categorie"
                  value={cat.slug}
                  checked={filters.categorie === cat.slug}
                  onChange={() => onChange({
                    ...filters,
                    categorie: filters.categorie === cat.slug ? '' : cat.slug,
                  })}
                  className="sr-only"
                />
              </label>
            ))}
          </div>
        </Section>
      )}

      {/* ── Section Marque ── */}
      {!hideBrand && availableBrands.length > 0 && (
        <Section title="Marque">
          {/* Search si > 6 marques */}
          {availableBrands.length > 6 && (
            <input
              type="text"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              placeholder="Rechercher une marque…"
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-xs text-[#1E293B] outline-none focus:border-[#F97316] bg-white mb-3 transition-colors"
            />
          )}
          <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
            {filteredBrands.map((brand) => {
              const isChecked = filters.marques.includes(brand)
              return (
                <label key={brand} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <span className={`w-4 h-4 rounded border-2 flex-shrink-0 transition-colors flex items-center justify-center ${
                    isChecked
                      ? 'bg-[#F97316] border-[#F97316]'
                      : 'border-[#CBD5E1] group-hover:border-[#F97316]/50'
                  }`}>
                    {isChecked && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span className={`text-sm transition-colors leading-tight ${
                    isChecked ? 'text-[#0F172A] font-semibold' : 'text-[#64748B] group-hover:text-[#1E293B]'
                  }`}>
                    {brand}
                  </span>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      const next = isChecked
                        ? filters.marques.filter(m => m !== brand)
                        : [...filters.marques, brand]
                      onChange({ ...filters, marques: next })
                    }}
                    className="sr-only"
                  />
                </label>
              )
            })}
            {filteredBrands.length === 0 && (
              <p className="text-xs text-[#94A3B8] py-1">Aucune marque trouvée</p>
            )}
          </div>
        </Section>
      )}

      {/* ── Section Prix ── */}
      <Section title="Prix (TND)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={filters.prix_min}
            onChange={(e) => onChange({ ...filters, prix_min: e.target.value })}
            placeholder="Min"
            min="0"
            className="flex-1 border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors min-w-0"
          />
          <span className="text-slate-400 text-sm shrink-0">—</span>
          <input
            type="number"
            value={filters.prix_max}
            onChange={(e) => onChange({ ...filters, prix_max: e.target.value })}
            placeholder="Max"
            min="0"
            className="flex-1 border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors min-w-0"
          />
        </div>
      </Section>

      {/* ── Section Disponibilité ── */}
      <Section title="Disponibilité">
        <div className="flex flex-col gap-3">
          {/* En promotion */}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <span className={`w-4 h-4 rounded border-2 flex-shrink-0 transition-colors flex items-center justify-center ${
              filters.en_promo ? 'bg-[#F97316] border-[#F97316]' : 'border-[#CBD5E1] group-hover:border-[#F97316]/50'
            }`}>
              {filters.en_promo && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-[#1E293B]">
              <Tag size={12} className="text-[#F97316]" />
              En promotion
            </span>
            <input
              type="checkbox"
              checked={filters.en_promo}
              onChange={(e) => onChange({ ...filters, en_promo: e.target.checked })}
              className="sr-only"
            />
          </label>
          {/* En stock */}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <span className={`w-4 h-4 rounded border-2 flex-shrink-0 transition-colors flex items-center justify-center ${
              filters.en_stock ? 'bg-[#22C55E] border-[#22C55E]' : 'border-[#CBD5E1] group-hover:border-[#22C55E]/50'
            }`}>
              {filters.en_stock && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            <span className="flex items-center gap-1.5 text-sm font-medium text-[#1E293B]">
              <Package size={12} className="text-[#22C55E]" />
              En stock
            </span>
            <input
              type="checkbox"
              checked={filters.en_stock}
              onChange={(e) => onChange({ ...filters, en_stock: e.target.checked })}
              className="sr-only"
            />
          </label>
        </div>
      </Section>

      {/* ── Section Tri ── */}
      <Section title="Trier par" defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          {[
            { val: '',          label: 'Pertinence' },
            { val: 'prix_asc',  label: 'Prix croissant' },
            { val: 'prix_desc', label: 'Prix décroissant' },
          ].map(({ val, label }) => (
            <label key={val} className="flex items-center gap-2.5 cursor-pointer group">
              <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                filters.tri === val
                  ? 'bg-[#F97316] border-[#F97316]'
                  : 'border-[#CBD5E1] group-hover:border-[#F97316]/50'
              }`}>
                {filters.tri === val && <span className="block w-full h-full rounded-full bg-white scale-[0.35]" />}
              </span>
              <span className={`text-sm flex items-center gap-1 transition-colors ${
                filters.tri === val ? 'text-[#0F172A] font-semibold' : 'text-[#64748B] group-hover:text-[#1E293B]'
              }`}>
                {val && <ArrowUpDown size={11} className="shrink-0" />}
                {label}
              </span>
              <input
                type="radio"
                name="tri"
                value={val}
                checked={filters.tri === val}
                onChange={() => onChange({ ...filters, tri: val })}
                className="sr-only"
              />
            </label>
          ))}
        </div>
      </Section>
    </aside>
  )
}
