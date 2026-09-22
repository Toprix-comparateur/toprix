// Configuration AdSense — blocs manuels.
//
// Les Auto Ads sont exclues de /marque et /categories : Google y injectait un
// <div class="google-auto-placed"> comme enfant direct de la rangée flex
// « filtres + grille », où il devenait un 3e flex item et écrasait la colonne
// produits (flex-1 min-w-0). Ces pages utilisent donc des blocs placés
// explicitement, hors de cette rangée, dans un conteneur pleine largeur.
//
// Un identifiant vide = bloc non rendu : aucun <ins> dans le DOM, donc aucune
// erreur AdSense tant que le bloc n'a pas été créé côté console.

export const ADSENSE_CLIENT = 'ca-pub-8451378376537532'

export const AD_SLOTS = {
  /** Bloc horizontal entre le fil d'Ariane et la grille produits */
  listeHaut: '',
  /** Bloc horizontal entre la grille produits et la FAQ */
  listeBas: '',
} as const
