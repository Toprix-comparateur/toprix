import { fetchAPI } from './config'
import type { Produit, ReponseAPI } from '@/types'

export async function getProduits(params?: {
  page?: number
  categorie?: string
  marque?: string
  q?: string
}): Promise<ReponseAPI<Produit[]>> {
  const query = new URLSearchParams(params as Record<string, string>).toString()
  return fetchAPI(`/produits/${query ? `?${query}` : ''}`)
}

export async function getProduit(slug: string): Promise<Produit> {
  return fetchAPI(`/produits/${slug}/`)
}
