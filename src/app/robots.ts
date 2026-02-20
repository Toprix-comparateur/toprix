import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://toprix-mu.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/static-sitemap.xml`,
      `${baseUrl}/categorie-sitemap.xml`,
      `${baseUrl}/souscategorie-sitemap.xml`,
      `${baseUrl}/brand-sitemap.xml`,
      `${baseUrl}/produit-sitemap.xml`,
    ],
  }
}
