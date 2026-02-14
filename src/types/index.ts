// Types globaux Toprix

export interface Produit {
  id: string
  slug: string
  nom: string
  marque: string
  prix_min?: number
  prix_max?: number
  image?: string
  categorie: string
  description?: string
}

export interface Categorie {
  id: string
  slug: string
  nom: string
  image?: string
  nombre_produits?: number
}

export interface Marque {
  id: string
  slug: string
  nom: string
  logo?: string
  nombre_produits?: number
}

export interface ArticleBlog {
  id: string
  slug: string
  titre: string
  contenu: string
  image?: string
  date_publication: string
  resume?: string
  avantages?: string[]
  inconvenients?: string[]
  specifications?: SpecificationsBlog
}

export interface SpecificationsBlog {
  ram?: string
  stockage?: string
  processeur?: string
  ecran?: string
  batterie?: string
  audio?: string
  camera?: string
}

export interface Boutique {
  id: string
  nom: string
  site_web?: string
}

export interface PaginationMeta {
  page: number
  total_pages: number
  total_items: number
  par_page: number
}

export interface ReponseAPI<T> {
  data: T
  meta?: PaginationMeta
}
