import type { Metadata } from 'next'
import { getMarque } from '@/lib/api/marques'
import { getProduits } from '@/lib/api/produits'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CarteProduit from '@/components/product/CarteProduit'
import { ChevronRight } from 'lucide-react'
import Pagination from '@/components/ui/Pagination'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const name = slug.join('/')
  try {
    const marque = await getMarque(name)
    return { title: `${marque.nom} - Comparer les prix`, description: `Comparez les meilleurs prix des produits ${marque.nom}.` }
  } catch {
    return { title: 'Marque introuvable' }
  }
}

export default async function MarqueDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const name = slug.join('/')
  const { page = '1' } = await searchParams

  let marque = null
  let produits = null

  try { marque = await getMarque(name) } catch { notFound() }
  try { produits = await getProduits({ marque: name, page: Number(page) }) } catch {}

  if (!marque) notFound()

  return (
    <div>
      {/* Hero marque */}
      <section className="bg-[#0F172A] py-8 px-4 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-64 h-64 bg-[#F97316] rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
            <Link href="/" className="hover:text-slate-300 transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/marque" className="hover:text-slate-300 transition-colors">Marques</Link>
            <ChevronRight size={12} />
            <span className="text-slate-300">{marque.nom}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-xl shrink-0">
              📦
            </div>
            <div>
              <h1 className="font-heading text-white text-2xl md:text-3xl font-bold">{marque.nom}</h1>
              {marque.nombre_produits !== undefined && (
                <p className="text-slate-400 text-sm">{marque.nombre_produits} produit(s) référencé(s)</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {produits && produits.data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
              {produits.data.map((p) => <CarteProduit key={p.id} produit={p} />)}
            </div>
            {produits.meta && produits.meta.total_pages > 1 && (
              <Pagination
                currentPage={produits.meta.page}
                totalPages={produits.meta.total_pages}
                buildUrl={(p) => {
                  const sp = new URLSearchParams()
                  if (p > 1) sp.set('page', String(p))
                  return sp.toString() ? `?${sp.toString()}` : '?'
                }}
              />
            )}
          </>
        ) : (
          <div className="text-center py-20 border border-dashed border-[#E2E8F0] rounded-2xl">
            <p className="font-heading text-[#0F172A] text-lg font-semibold mb-2">Aucun produit pour le moment</p>
            <p className="text-[#64748B] text-sm mb-6">Les produits {marque.nom} seront bientôt disponibles.</p>
            <Link href="/marque" className="inline-flex items-center gap-2 text-[#F97316] text-sm font-semibold hover:underline">
              <ChevronRight size={14} className="rotate-180" /> Retour aux marques
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
