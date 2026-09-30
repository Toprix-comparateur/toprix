import { MessageCircle } from 'lucide-react'

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

export default function MessengerButton() {
  return (
    <a
      href={MESSENGER_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter avec Toprix sur Messenger"
      // z-20 : le panneau de filtres mobile est en z-40 et son overlay en z-30,
      // le bouton doit passer dessous quand ils s'ouvrent.
      className="group fixed bottom-5 right-5 z-20 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#00B2FF] to-[#006AFF] px-4 py-3.5 text-white shadow-lg shadow-[#006AFF]/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#006AFF]/35"
    >
      <MessageCircle size={20} className="shrink-0" />
      <span className="hidden text-sm font-semibold sm:inline">Discuter</span>
    </a>
  )
}
