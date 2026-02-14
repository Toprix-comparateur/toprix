import { fetchAPI } from './config'
import type { Categorie, ReponseAPI } from '@/types'

export async function getCategories(): Promise<ReponseAPI<Categorie[]>> {
  return fetchAPI('/categories/')
}

export async function getCategorie(slug: string): Promise<Categorie> {
  return fetchAPI(`/categories/${slug}/`)
}
