import { NextResponse } from 'next/server'
import { SITE_URL, API_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 7200

export async function GET() {
  const baseUrl = SITE_URL

  try {
    const allProduits: { id: string }[] = []
    let page = 1
    let totalPages = 1
    const maxPages = 20

    while (page <= totalPages && page <= maxPages) {
      const response = await fetch(`${API_URL}/produits/?page=${page}`, {
        next: { revalidate: 7200 },
      })
      if (!response.ok) break

      const { data: produits, meta } = await response.json()
      if (!produits || produits.length === 0) break

      allProduits.push(...produits)
      totalPages = meta?.total_pages ?? 1
      page++
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allProduits.map((p) => `  <url>
    <loc>${baseUrl}/produit/${p.id}</loc>
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
