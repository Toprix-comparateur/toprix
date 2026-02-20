import { NextResponse } from 'next/server'
import { SITE_URL, API_URL } from '@/lib/config'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  const baseUrl = SITE_URL
  const apiUrl = API_URL

  try {
    // Récupérer un échantillon de produits pour extraire les marques
    // TODO: Créer un endpoint backend dédié /brands/ pour plus d'efficacité
    const response = await fetch(`${apiUrl}/produits/?page=1`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch products for brands')
    }

    const { data: produits } = await response.json()

    // Extraire les marques uniques
    const brandsSet = new Set<string>()
    for (const produit of produits || []) {
      if (produit.marque) {
        brandsSet.add(produit.marque)
      }
    }

    const brands = Array.from(brandsSet).sort()

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${brands.map((brand) => {
  const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `  <url>
    <loc>${baseUrl}/rechercher?marque=${encodeURIComponent(brand)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
}).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating brand sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
