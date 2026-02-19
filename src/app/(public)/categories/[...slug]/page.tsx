import type { Metadata } from 'next'
import { getCategorieDetail } from '@/lib/api/categories'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CarteProduit from '@/components/product/CarteProduit'
import { ChevronRight, LayoutGrid } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fullSlug = slug.join('/')
  try {
    const { categorie } = await getCategorieDetail(fullSlug)
    return {
      title: `${categorie.nom} - Comparer les prix`,
      description: `Comparez les meilleurs prix pour les produits ${categorie.nom}.`,
    }
  } catch {
    return { title: 'Catégorie introuvable' }
  }
}

export default async function CategorieDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page = '1' } = await searchParams

  const fullSlug = slug.join('/')
  const isSubcat = slug.length >= 2

  let detail = null

  try {
    detail = await getCategorieDetail(fullSlug, Number(page))
  } catch {
    notFound()
  }

  if (!detail) notFound()

  const { categorie, data: produits, meta } = detail

  return (
    <div>
      {/* Breadcrumb hero */}
      <section className="bg-[#0F172A] py-8 px-4 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-64 h-64 bg-[#F97316] rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 flex-wrap">
            <Link href="/" className="hover:text-slate-300 transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/categories" className="hover:text-slate-300 transition-colors">Catégories</Link>
            {isSubcat && categorie.parent_slug && (
              <>
                <ChevronRight size={12} />
                <Link
                  href={`/categories/${categorie.parent_slug}`}
                  className="hover:text-slate-300 transition-colors capitalize"
                >
                  {categorie.parent_nom ?? categorie.parent_slug.replace(/-/g, ' ')}
                </Link>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-slate-300">{categorie.nom}</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center shrink-0">
              <LayoutGrid size={20} className="text-[#F97316]" />
            </div>
            <div>
              <h1 className="font-heading text-white text-2xl md:text-3xl font-bold">{categorie.nom}</h1>
              <p className="text-slate-400 text-sm">{meta?.total_items ?? 0} produit(s) disponible(s)</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {produits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {produits.map((p) => <CarteProduit key={p.id} produit={p} />)}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-[#E2E8F0] rounded-2xl">
            <p className="font-heading text-[#0F172A] text-lg font-semibold mb-2">Aucun produit pour le moment</p>
            <p className="text-[#64748B] text-sm mb-6">Cette catégorie sera bientôt peuplée.</p>
            <Link href="/categories" className="inline-flex items-center gap-2 text-[#F97316] text-sm font-semibold hover:underline">
              <ChevronRight size={14} className="rotate-180" /> Retour aux catégories
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
