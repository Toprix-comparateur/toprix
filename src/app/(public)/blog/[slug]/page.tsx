import type { Metadata } from 'next'
import { getArticle } from '@/lib/api/blog'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const article = await getArticle(slug)
    return {
      title: article.titre,
      description: article.resume,
    }
  } catch {
    return { title: 'Article introuvable' }
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params

  let article = null
  try {
    article = await getArticle(slug)
  } catch {
    notFound()
  }

  if (!article) notFound()

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {article.image && (
        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8 bg-gray-100">
          <Image
            src={article.image}
            alt={article.titre}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {article.titre}
      </h1>

      <p className="text-sm text-gray-400 mb-8">
        Publié le {new Date(article.date_publication).toLocaleDateString('fr-FR')}
      </p>

      <div
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: article.contenu }}
      />

      {/* Avantages / Inconvénients */}
      {(article.avantages || article.inconvenients) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 p-6 bg-gray-50 rounded-xl">
          {article.avantages && article.avantages.length > 0 && (
            <div>
              <h3 className="font-semibold text-green-700 mb-3">Avantages</h3>
              <ul className="space-y-2">
                {article.avantages.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5">✓</span> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {article.inconvenients && article.inconvenients.length > 0 && (
            <div>
              <h3 className="font-semibold text-red-700 mb-3">Inconvénients</h3>
              <ul className="space-y-2">
                {article.inconvenients.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-red-500 mt-0.5">✗</span> {inc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
