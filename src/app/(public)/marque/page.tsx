import type { Metadata } from 'next'
import { getMarques } from '@/lib/api/marques'
import PageHero from '@/components/ui/PageHero'
import MarquesGrid from '@/components/marques/MarquesGrid'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Marques high-tech',
  description: 'Comparez les produits de toutes les grandes marques high-tech.',
  alternates: { canonical: '/marque' },
}

export default async function MarquesPage() {
  let marques = null
  let erreur = null

  try { marques = await getMarques() } catch { erreur = 'Impossible de charger les marques.' }

  return (
    <div>
      <PageHero
        surtitre="Référencées"
        titre="Toutes les marques"
        sousTitre="Apple, Samsung, Sony, et des centaines d'autres marques high-tech."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {erreur && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm mb-6">{erreur}</div>
        )}

        {marques && <MarquesGrid marques={marques.data} />}
      </div>
    </div>
  )
}
