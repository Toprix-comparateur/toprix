import type { Metadata } from 'next'
import { getMarque } from '@/lib/api/marques'
import { getProduits } from '@/lib/api/produits'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import FilteredProductsSection from '@/components/product/FilteredProductsSection'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string[] }>
  searchParams: Promise<{
    page?: string
    boutique?: string
    tri?: string
    prix_min?: string
    prix_max?: string
    en_promo?: string
    en_stock?: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const name = slug.join('/')
  try {
    const marque = await getMarque(name)
    const title = `${marque.nom.toUpperCase()} – Produits au meilleur prix en Tunisie`
    const description = `Découvrez tous les produits ${marque.nom} en Tunisie. Comparez les prix sur Mytek, Tunisianet et Spacenet pour trouver les meilleures offres.`
    return {
      title,
      description,
      alternates: { canonical: `/marque/${name}` },
      openGraph: { title, description, type: 'website' },
    }
  } catch {
    return { title: 'Marque introuvable' }
  }
}

export default async function MarqueDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const name = slug.join('/')
  const {
    page = '1',
    boutique = '',
    tri = '',
    prix_min = '',
    prix_max = '',
    en_promo = '',
    en_stock = '',
  } = await searchParams

  let marque = null
  let produits = null

  try { marque = await getMarque(name) } catch { notFound() }
  try {
    produits = await getProduits({
      marque: name,
      page: Number(page),
      boutique: boutique || undefined,
      tri: tri || undefined,
      prix_min: prix_min ? Number(prix_min) : undefined,
      prix_max: prix_max ? Number(prix_max) : undefined,
      en_promo: en_promo === '1',
      en_stock: en_stock === '1',
    })
  } catch {}

  if (!marque) notFound()

  const nbResultats = produits?.meta?.total_items ?? produits?.data.length ?? 0

  return (
    <div>
      {/* Hero marque */}
      <section className="bg-[#0F172A] py-8 px-4 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-64 h-64 bg-[#F97316] rounded-full blur-[100px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">

          {/* Breadcrumb + bouton retour */}
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/marque"
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all shrink-0"
              aria-label="Retour aux marques"
            >
              <ChevronLeft size={16} />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-slate-500">
              <Link href="/" className="hover:text-slate-300 transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link href="/marque" className="hover:text-slate-300 transition-colors">Marques</Link>
              <ChevronRight size={12} />
              <span className="text-slate-300 font-medium">{marque.nom}</span>
            </nav>
          </div>

          {/* Titre marque */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-xl shrink-0">
              📦
            </div>
            <div>
              <h1 className="font-heading text-white text-2xl md:text-3xl font-bold">{marque.nom}</h1>
              <p className="text-slate-400 text-sm">
                {nbResultats > 0 ? `${nbResultats} produit${nbResultats > 1 ? 's' : ''}` : marque.nombre_produits !== undefined ? `${marque.nombre_produits} produit(s) référencé(s)` : ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FilteredProductsSection
          initialProducts={produits?.data ?? []}
          initialMeta={produits?.meta ?? null}
          fixedMarque={name}
          initialFilters={{
            boutique,
            tri,
            prix_min,
            prix_max,
            en_promo: en_promo === '1',
            en_stock: en_stock === '1',
          }}
          hideBrand={true}
          hideCategorie={false}
        />
      </div>
    </div>
  )
}
