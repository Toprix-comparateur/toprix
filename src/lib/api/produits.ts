import { fetchAPI } from './config'
import type { Produit, ReponseAPI } from '@/types'

export async function getProduits(params?: {
  page?: number
  categorie?: string
  marque?: string
  q?: string
}): Promise<ReponseAPI<Produit[]>> {
  const clean: Record<string, string> = {}
  if (params?.q) clean.q = params.q
  if (params?.page && params.page > 1) clean.page = String(params.page)
  if (params?.categorie) clean.categorie = params.categorie
  if (params?.marque) clean.marque = params.marque
  const query = new URLSearchParams(clean).toString()
  return fetchAPI(`/produits/${query ? `?${query}` : ''}`)
}

export async function getProduit(slug: string): Promise<Produit> {
  return fetchAPI(`/produits/${slug}/`)
}
