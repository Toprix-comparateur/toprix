'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

interface Marque {
  id: string
  slug: string
  nom: string
  nombre_produits?: number
}

export default function MarquesGrid({ marques }: { marques: Marque[] }) {
  const [q, setQ] = useState('')

  const filtered = q.trim()
    ? marques.filter(m => m.nom.toLowerCase().includes(q.toLowerCase()))
    : marques

  return (
    <>
      <div className="mb-6 relative max-w-sm">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Rechercher une marque…"
          className="w-full border border-[#E2E8F0] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#1E293B] outline-none focus:border-[#F97316] bg-white transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.map((marque) => (
          <Link
            key={marque.id}
            href={`/marque/${marque.slug}`}
            className="group flex flex-col items-center justify-center gap-2 bg-white border border-[#E2E8F0] rounded-2xl py-5 px-3 hover:border-[#F97316]/50 hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-xl group-hover:bg-[#F97316]/10 transition-colors">
              📦
            </div>
            <p className="font-semibold text-[#1E293B] text-sm text-center group-hover:text-[#F97316] transition-colors">
              {marque.nom}
            </p>
            {marque.nombre_produits !== undefined && (
              <p className="text-xs text-[#64748B]">{marque.nombre_produits} produits</p>
            )}
          </Link>
        ))}
      </div>

      {filtered.length === 0 && q.trim() && (
        <p className="text-[#94A3B8] text-sm text-center py-10">
          Aucune marque trouvée pour <span className="font-semibold text-[#64748B]">&laquo; {q} &raquo;</span>
        </p>
      )}
    </>
  )
}
