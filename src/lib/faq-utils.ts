import type { FAQ } from './faq-data'
import {
  FAQ_SMARTPHONES,
  FAQ_LAPTOPS,
  FAQ_TV,
  FAQ_GAMING,
  FAQ_ELECTROMENAGER,
  FAQ_MARQUES,
  FAQ_ACHAT_LIGNE,
} from './faq-data'

const SECTION_MAP: Record<string, FAQ[]> = {
  telephonie:     FAQ_SMARTPHONES,
  informatique:   FAQ_LAPTOPS,
  'tv-et-son':    FAQ_TV,
  gaming:         FAQ_GAMING,
  electromenager: FAQ_ELECTROMENAGER,
}

/** Hash stable d'une chaîne → entier */
function strHash(s: string): number {
  return s.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
}

/**
 * Retourne 3 FAQs pour une page catégorie.
 *
 * Anti-duplication :
 * - Catégorie parente (slug.length === 1) → fenêtre [0..2] (toujours les 3 premières)
 * - Sous-catégorie (slug.length >= 2) → fenêtre décalée à partir de l'index 3,
 *   déterminée par hash du chemin complet (slug.join('-'))
 * - Catégories sans section dédiée → FAQ_ACHAT_LIGNE avec offset par hash
 */
export function getFAQsForCategory(slug: string[]): FAQ[] {
  const parent = slug[0]
  const section = SECTION_MAP[parent]

  if (!section) {
    // Pas de section dédiée → FAQ_ACHAT_LIGNE, offset par hash du slug complet
    const windowCount = Math.floor(FAQ_ACHAT_LIGNE.length / 3)
    const offset = (strHash(slug.join('-')) % windowCount) * 3
    return FAQ_ACHAT_LIGNE.slice(offset, offset + 3)
  }

  if (slug.length === 1) {
    // Catégorie parente → toujours les 3 premières (les plus génériques)
    return section.slice(0, 3)
  }

  // Sous-catégorie → fenêtre décalée, jamais les mêmes que le parent
  const windowCount = Math.floor((section.length - 3) / 3)
  const offset = windowCount > 0
    ? 3 + (strHash(slug.join('-')) % windowCount) * 3
    : 3
  const safeOffset = Math.min(offset, section.length - 3)
  return section.slice(safeOffset, safeOffset + 3)
}

/**
 * Retourne 3 FAQs pour une page marque.
 * Priorité aux FAQs mentionnant la marque, complétées par des génériques.
 */
export function getFAQsForBrand(brandName: string): FAQ[] {
  const lower = brandName.toLowerCase()
  const mentioning = FAQ_MARQUES.filter(
    f => f.q.toLowerCase().includes(lower) || f.r.toLowerCase().includes(lower)
  )
  if (mentioning.length >= 3) return mentioning.slice(0, 3)
  const rest = FAQ_MARQUES.filter(f => !mentioning.includes(f))
  return [...mentioning, ...rest].slice(0, 3)
}

/** Construit le JSON-LD FAQPage à partir d'une liste de FAQs */
export function buildFaqJsonLd(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, r }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: r },
    })),
  }
}
