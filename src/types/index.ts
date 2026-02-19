// Types globaux Toprix

export interface OffreBoutique {
  boutique: string
  prix: number
  stock: string
  url: string
  image?: string
}

export interface Produit {
  id: string
  slug: string | null
  nom: string
  marque: string
  prix_min?: number
  prix_max?: number
  image?: string
  categorie: string
  categorie_nom?: string
  description?: string
  en_stock?: boolean
  discount?: number
  reference?: string
  boutique?: string
  url_boutique?: string
  offres?: OffreBoutique[]
}

export interface SousCategorie {
  id: string
  slug: string
  nom: string
  parent_slug: string
  nombre_produits?: number
}

export interface Categorie {
  id: string
  slug: string
  nom: string
  image?: string
  nombre_produits?: number
  parent_slug?: string
  parent_nom?: string
  sous_categories?: SousCategorie[]
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
