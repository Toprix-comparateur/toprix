// Bouton flottant vers Messenger, en remplacement de Tawk.to.
//
// Le plugin de chat Messenger n'est plus proposé par Meta : les paramètres de
// messagerie de la Page ne donnent plus que l'URL m.me. Il imposait en outre
// d'être connecté à Facebook pour écrire, ce que ce lien n'exige pas.
//
// C'est un simple <a> : aucun SDK, aucun cookie tiers, aucun JavaScript client,
// donc aucun impact sur les Core Web Vitals.

// Lien Messenger de la Page Toprix.
// Les paramètres de messagerie affichent un autre identifiant (1305653529294876) ;
// c'est bien celui-ci qui est le bon, vérifié côté Page.
const MESSENGER_URL = 'https://m.me/1299621413240558'

/** Glyphe Messenger officiel — lucide-react ne fournit pas d'icônes de marque. */
function MessengerLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.24 0 0 4.95 0 11.64c0 3.5 1.44 6.53 3.78 8.62.2.18.32.43.32.7l.06 2.14c.02.68.72 1.13 1.35.86l2.39-1.05c.2-.09.43-.11.65-.05 1.09.3 2.26.46 3.45.46 6.76 0 12-4.95 12-11.64C24 4.95 18.76 0 12 0zm7.2 8.93l-3.53 5.6c-.56.89-1.76 1.11-2.6.48l-2.81-2.1a.72.72 0 0 0-.87 0l-3.79 2.88c-.51.39-1.17-.22-.83-.76l3.53-5.6c.56-.89 1.76-1.11 2.6-.48l2.81 2.1a.72.72 0 0 0 .87 0l3.79-2.88c.51-.39 1.17.21.83.76z" />
    </svg>
  )
}

export default function MessengerButton() {
  return (
    <a
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur Facebook Messenger"
      // Mobile : pastille ronde, logo seul (le libellé est trop long pour un
      // écran étroit). Desktop : pilule avec le texte.
      // z-20 : le panneau de filtres mobile est en z-40 et son overlay en z-30,
      // le bouton doit passer dessous quand ils s'ouvrent.
      className="fixed bottom-5 right-5 z-20 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#00B2FF] via-[#006AFF] to-[#A033FF] p-3.5 text-white shadow-lg shadow-[#006AFF]/30 ring-1 ring-white/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#006AFF]/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006AFF] sm:px-5 sm:py-3"
    >
      <MessengerLogo className="h-6 w-6 shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">Contactez-nous sur Facebook</span>
    </a>
  )
}
