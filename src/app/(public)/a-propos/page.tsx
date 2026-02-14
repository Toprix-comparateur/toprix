import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'À propos de Toprix',
  description: 'Toprix est le premier comparateur de pièces automobiles en Tunisie.',
}

export default function AProposPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">À propos</h1>
      <div className="prose prose-gray max-w-none">
        <p>
          <strong>Toprix</strong> est le premier comparateur de pièces automobiles en Tunisie.
          Notre mission est de vous aider à trouver les meilleures offres pour vos pièces auto
          parmi les boutiques en ligne tunisiennes.
        </p>
        <h2>Notre mission</h2>
        <p>
          Comparer les prix, gagner du temps, et trouver la bonne pièce au meilleur prix.
        </p>
        <h2>Contact</h2>
        <p>
          Pour toute question ou suggestion, contactez-nous via la page{' '}
          <a href="/contact" className="text-blue-600 hover:underline">Contact</a>.
        </p>
      </div>
    </div>
  )
}
