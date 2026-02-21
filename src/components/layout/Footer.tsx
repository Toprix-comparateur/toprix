import Link from 'next/link'

const LIENS = {
  navigation: [
    { href: '/categories', label: 'Catégories'  },
    { href: '/marque',     label: 'Marques'     },
    { href: '/boutiques',  label: 'Boutiques'   },
    { href: '/rechercher', label: 'Rechercher'  },
  ],
  informations: [
    { href: '/blog',     label: 'Blog & guides' },
    { href: '/a-propos', label: 'À propos'      },
    { href: '/contact',  label: 'Contact'       },
    { href: '/ajouter',  label: 'Ajouter une boutique' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#0F172A]">

      {/* Séparateur orange */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Marque */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-0.5 mb-4">
              <span className="font-heading text-white text-2xl font-bold tracking-tight">Top</span>
              <span className="font-heading text-[#F97316] text-2xl font-bold tracking-tight">rix</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Le comparateur de produits high-tech en Tunisie. Comparez les prix parmi toutes les boutiques en quelques secondes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Navigation</p>
            <ul className="space-y-2.5">
              {LIENS.navigation.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 text-sm hover:text-[#F97316] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div>
            <p className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Informations</p>
            <ul className="space-y-2.5">
              {LIENS.informations.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-slate-400 text-sm hover:text-[#F97316] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bas */}
        <div className="border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Toprix. Tous droits réservés.
          </p>
          <p className="text-slate-700 text-xs">
            Fait avec passion pour les consommateurs tunisiens 🇹🇳
          </p>
        </div>
      </div>
    </footer>
  )
}
