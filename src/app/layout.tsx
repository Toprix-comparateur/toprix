import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['500', '600', '700'],
  display: 'swap',
})

const GTM_ID    = 'GTM-T7FNCLZT'
const ADSENSE_ID = 'ca-pub-8451378376537532'

export const metadata: Metadata = {
  title: {
    default: 'Toprix - Comparateur de produits high-tech',
    template: '%s | Toprix',
  },
  description: 'Comparez les prix des smartphones, laptops et produits high-tech parmi toutes les boutiques en Tunisie.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://toprix.tn'),

  icons: {
    // favicon.ico géré automatiquement par src/app/favicon.ico (App Router)
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  manifest: '/site.webmanifest',

  // Vérifications moteurs de recherche
  verification: {
    // google: 'XXXX', // à ajouter si Search Console demande la vérification HTML
    // other: { 'msvalidate.01': 'XXXX' }, // Bing Webmaster Tools (à obtenir)
  },

  // Balises meta personnalisées
  other: {
    'google-adsense-account': ADSENSE_ID,
    'Petal-Search-site-verification': '4434db8634', // Huawei Petal Search
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        {/* GTM noscript fallback (doit être juste après <body>) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* Google Tag Manager — charge GA4 (G-5H9RJNSB6R) + Microsoft Clarity via GTM */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
