import { NextResponse } from 'next/server'
import { SITE_URL, API_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 7200 // revalider toutes les 2 heures

export async function GET() {
  const baseUrl = SITE_URL
  const apiUrl = API_URL

  try {
    // Récupérer plusieurs pages de produits
    // TODO: Pour un grand catalogue, créer plusieurs sitemaps (produit-1.xml, produit-2.xml, etc.)
    const maxPages = 10 // Limiter à 10 pages pour éviter timeout
    const allProduits: any[] = []

    for (let page = 1; page <= maxPages; page++) {
      const response = await fetch(`${apiUrl}/produits/?page=${page}`, {
        next: { revalidate: 7200 },
      })

      if (!response.ok) break

      const { data: produits, meta } = await response.json()
      if (!produits || produits.length === 0) break

      allProduits.push(...produits)

      // Arrêter si c'est la dernière page
      if (!meta?.has_next) break
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allProduits.map((produit) => `  <url>
    <loc>${baseUrl}/produit/${produit.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=7200, s-maxage=7200',
      },
    })
  } catch (error) {
    console.error('Error generating produit sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
