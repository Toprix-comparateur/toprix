import type { Metadata } from 'next'
import { getProduit } from '@/lib/api/produits'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ExternalLink, Tag, Wrench, CheckCircle, XCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const produit = await getProduit(slug)
    return { title: `${produit.nom} - ${produit.marque}`, description: produit.description }
  } catch {
    return { title: 'Produit introuvable' }
  }
}

export default async function ProduitDetailPage({ params }: Props) {
  const { slug } = await params
  let produit = null
  try { produit = await getProduit(slug) } catch { notFound() }
  if (!produit) notFound()

  return (
    <div>
      {/* Hero dark slim */}
      <section className="bg-[#0F172A] py-5 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <Link href="/categories" className="hover:text-slate-300 transition-colors">Catégories</Link>
            <ChevronRight size={12} />
            <span className="text-slate-300 truncate max-w-xs">{produit.nom}</span>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Image */}
          <div className="relative h-72 md:h-96 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] overflow-hidden flex items-center justify-center">
            {produit.image ? (
              <Image
                src={produit.image}
                alt={produit.nom}
                fill
                className="object-contain p-8"
                priority
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-200">
                <Wrench size={48} />
                <p className="text-sm text-slate-400">Image non disponible</p>
              </div>
            )}
          </div>

          {/* Infos */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 bg-[#F97316]/10 text-[#F97316] text-xs font-semibold px-2.5 py-1 rounded-full">
                  <Tag size={10} />
                  {produit.marque}
                </span>
                <span className="text-xs text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                  {produit.categorie}
                </span>
              </div>
              <h1 className="font-heading text-[#0F172A] text-2xl md:text-3xl font-bold leading-tight">
                {produit.nom}
              </h1>
            </div>

            {/* Prix */}
            {produit.prix_min && (
              <div className="bg-[#0F172A] rounded-2xl p-5">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Meilleur prix constaté</p>
                <div className="flex items-end gap-3">
                  <p className="font-heading text-[#F97316] text-4xl font-bold">
                    {produit.prix_min} DT
                  </p>
                  {produit.prix_max && produit.prix_max !== produit.prix_min && (
                    <p className="text-slate-500 text-lg mb-1 line-through">
                      {produit.prix_max} DT
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {produit.description && (
              <p className="text-[#64748B] text-sm leading-relaxed border-l-2 border-[#F97316]/30 pl-4">
                {produit.description}
              </p>
            )}

            {/* Tableau comparaison boutiques */}
            {produit.offres && produit.offres.length > 0 && (
              <div>
                <h2 className="font-heading text-[#0F172A] text-base font-semibold mb-3">
                  Comparer les offres
                </h2>
                <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-3 bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                    <span>Boutique</span>
                    <span className="text-center">Prix</span>
                    <span className="text-right">Action</span>
                  </div>
                  {produit.offres.map((offre, i) => (
                    <div
                      key={offre.boutique}
                      className={`grid grid-cols-3 items-center px-4 py-3 text-sm ${i < produit.offres!.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}
                    >
                      <div>
                        <span className="font-medium text-[#1E293B]">{offre.boutique}</span>
                        {offre.stock && (
                          <p className="text-xs text-[#64748B] mt-0.5 flex items-center gap-1">
                            {offre.stock === 'En stock'
                              ? <><CheckCircle size={10} className="text-green-500" /> En stock</>
                              : <><XCircle size={10} className="text-red-400" /> {offre.stock}</>}
                          </p>
                        )}
                      </div>
                      <span className={`text-center font-bold ${i === 0 ? 'text-[#F97316]' : 'text-[#1E293B]'}`}>
                        {offre.prix} DT
                        {i === 0 && produit.offres!.length > 1 && (
                          <span className="ml-1 text-xs font-normal text-[#F97316]">✓ Meilleur</span>
                        )}
                      </span>
                      <div className="flex justify-end">
                        <a
                          href={offre.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs bg-[#F97316] hover:bg-[#EA6C0A] text-white px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Voir <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
