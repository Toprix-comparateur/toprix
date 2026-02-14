import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getArticles } from '@/lib/api/blog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog - Guides et conseils automobiles',
  description: 'Guides, conseils et comparatifs pour vos pièces automobiles.',
}

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Number(params.page ?? 1)

  let articles = null
  let erreur = null

  try {
    articles = await getArticles(page)
  } catch {
    erreur = 'Impossible de charger les articles.'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>

      {erreur && <p className="text-red-500">{erreur}</p>}

      {articles && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.data.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {article.image && (
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={article.image}
                    alt={article.titre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                  {article.titre}
                </h2>
                {article.resume && (
                  <p className="text-gray-500 text-sm line-clamp-3">{article.resume}</p>
                )}
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(article.date_publication).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
