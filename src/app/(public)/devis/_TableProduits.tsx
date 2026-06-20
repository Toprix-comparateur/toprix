'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

interface Ligne { id: number; produit: string; quantite: string }

let compteur = 3

export default function TableProduits() {
  const [lignes, setLignes] = useState<Ligne[]>([
    { id: 0, produit: '', quantite: '' },
    { id: 1, produit: '', quantite: '' },
    { id: 2, produit: '', quantite: '' },
  ])

  function ajouterLigne() {
    setLignes(l => [...l, { id: ++compteur, produit: '', quantite: '' }])
  }

  function supprimerLigne(id: number) {
    setLignes(l => l.length > 1 ? l.filter(r => r.id !== id) : l)
  }

  function changerProduit(id: number, val: string) {
    setLignes(l => l.map(r => r.id === id ? { ...r, produit: val } : r))
  }

  function changerQuantite(id: number, val: string) {
    setLignes(l => l.map(r => r.id === id ? { ...r, quantite: val } : r))
  }

  return (
    <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
      {/* En-tête */}
      <div className="grid grid-cols-[1fr_100px_36px] bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="px-3 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wide">Nom du produit</div>
        <div className="px-3 py-2 text-xs font-semibold text-[#64748B] uppercase tracking-wide border-l border-[#E2E8F0]">Quantité (pcs)</div>
        <div />
      </div>

      {/* Lignes */}
      {lignes.map((ligne, idx) => (
        <div key={ligne.id} className="grid grid-cols-[1fr_100px_36px] border-b border-[#E2E8F0] last:border-b-0">
          <input
            type="text"
            name="produit"
            value={ligne.produit}
            onChange={e => changerProduit(ligne.id, e.target.value)}
            placeholder={idx === 0 ? 'ex: Climatiseur Gree 12000 BTU' : 'Nom du produit'}
            className="px-3 py-2.5 text-sm text-[#1E293B] placeholder:text-[#CBD5E1] focus:outline-none focus:bg-[#FFF7ED] transition-colors w-full"
          />
          <input
            type="number"
            name="quantite"
            min="1"
            value={ligne.quantite}
            onChange={e => changerQuantite(ligne.id, e.target.value)}
            placeholder="1"
            className="px-3 py-2.5 text-sm text-[#1E293B] placeholder:text-[#CBD5E1] focus:outline-none focus:bg-[#FFF7ED] transition-colors border-l border-[#E2E8F0] w-full"
          />
          <button
            type="button"
            onClick={() => supprimerLigne(ligne.id)}
            disabled={lignes.length === 1}
            className="flex items-center justify-center text-[#CBD5E1] hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-l border-[#E2E8F0]"
            aria-label="Supprimer la ligne"
          >
            <Trash2 size={13} />
          </button>
        </div>
      ))}

      {/* Pied */}
      <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-3 py-2">
        <button
          type="button"
          onClick={ajouterLigne}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] hover:text-[#EA6C0A] transition-colors"
        >
          <Plus size={13} />
          Ajouter une ligne
        </button>
      </div>
    </div>
  )
}
