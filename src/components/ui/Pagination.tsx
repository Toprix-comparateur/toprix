import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  buildUrl: (page: number) => string
}

export default function Pagination({ currentPage, totalPages, buildUrl }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
      {currentPage > 1 ? (
        <a
          href={buildUrl(currentPage - 1)}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg text-[#64748B] hover:border-[#F97316]/40 hover:text-[#F97316] transition-colors"
        >
          <ChevronLeft size={14} /> Préc.
        </a>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg text-slate-300 cursor-not-allowed">
          <ChevronLeft size={14} /> Préc.
        </span>
      )}

      {pages.reduce<React.ReactNode[]>((acc, p, i, arr) => {
        if (i > 0 && p - arr[i - 1] > 1) {
          acc.push(<span key={`ellipsis-${p}`} className="px-2 text-slate-400 text-sm">…</span>)
        }
        acc.push(
          p === currentPage ? (
            <span key={p} className="inline-flex items-center justify-center w-9 h-9 text-sm font-semibold bg-[#F97316] text-white rounded-lg">
              {p}
            </span>
          ) : (
            <a key={p} href={buildUrl(p)} className="inline-flex items-center justify-center w-9 h-9 text-sm border border-[#E2E8F0] rounded-lg text-[#64748B] hover:border-[#F97316]/40 hover:text-[#F97316] transition-colors">
              {p}
            </a>
          )
        )
        return acc
      }, [])}

      {currentPage < totalPages ? (
        <a
          href={buildUrl(currentPage + 1)}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg text-[#64748B] hover:border-[#F97316]/40 hover:text-[#F97316] transition-colors"
        >
          Suiv. <ChevronRight size={14} />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg text-slate-300 cursor-not-allowed">
          Suiv. <ChevronRight size={14} />
        </span>
      )}
    </nav>
  )
}
