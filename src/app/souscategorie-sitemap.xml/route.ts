import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export async function GET() {
  const baseUrl = 'https://toprix-mu.vercel.app'
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.toprix.tn/api/v1'

  try {
    const response = await fetch(`${apiUrl}/categories/`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    const { data: categories } = await response.json()

    // Aplatir toutes les sous-catégories
    const sousCategories: any[] = []
    for (const cat of categories || []) {
      if (cat.sous_categories && Array.isArray(cat.sous_categories)) {
        sousCategories.push(...cat.sous_categories)
      }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sousCategories.map((sous) => `  <url>
    <loc>${baseUrl}/categories/${sous.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating souscategorie sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}
