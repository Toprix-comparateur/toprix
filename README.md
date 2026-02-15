# Toprix Frontend

Comparateur de prix high-tech en Tunisie — interface Next.js déployée sur Vercel.

**Production :** `https://toprix-mu.vercel.app` (alias : `toprix.tn`)
**API :** `https://api.toprix.tn/api/v1`

---

## Stack technique

| Outil | Version | Usage |
|-------|---------|-------|
| Next.js | 15 (App Router) | Framework SSR |
| TypeScript | 5 | Typage |
| Tailwind CSS | 4 | Styles |
| Lucide React | — | Icônes |

Rendu 100 % **SSR** (`force-dynamic`) — pas de Client Components, filtres via `searchParams` URL.

---

## Structure des pages

```
src/app/(public)/
├── page.tsx                    # Accueil
├── rechercher/page.tsx         # Recherche + filtres avancés
├── produit/[slug]/page.tsx     # Détail produit
├── categories/page.tsx         # Liste catégories
├── categories/[slug]/page.tsx  # Produits d'une catégorie
├── marques/page.tsx            # Liste marques
├── marques/[name]/page.tsx     # Produits d'une marque
├── blog/page.tsx               # Liste articles
├── blog/[slug]/page.tsx        # Article détail
├── boutiques/page.tsx          # Boutiques partenaires
├── ajouter/page.tsx            # Formulaire demande
└── contact/page.tsx            # Contact
```

---

## Composants clés

### `CarteProduit`
Affiche un produit en grille avec :
- Badge **-X DT** (discount) sur l'image
- Badge store coloré : **Mytek** (bleu) · **Tunisianet** (vert) · **Spacenet** (violet)
- Ancien prix barré + prix actuel en orange
- **Économie : X DT** en vert
- Indicateur **● En stock** / **○ Rupture de stock**

### `Header`
- Logo Toprix 🇹🇳 sticky
- Bandeau **🌙 Ramadan Mubarak · رمضان كريم** (doré, haut du header)
- Navigation desktop + icône menu mobile

---

## Page `/rechercher`

Filtres disponibles (tous en `searchParams` GET, SSR-compatible) :

| Param | Type | Description |
|-------|------|-------------|
| `q` | string | Terme de recherche |
| `categorie` | string | Filtrer par catégorie |
| `marque` | string | Filtrer par marque |
| `prix_min` | number | Prix minimum (DT) |
| `prix_max` | number | Prix maximum (DT) |
| `en_promo` | `1` | Promotions uniquement |
| `page` | number | Pagination (20/page) |

Panneau filtre : `<details>`/`<summary>` natif HTML (toggle CSS pur, SSR-compatible).
Badges actifs supprimables individuellement via `buildFilterUrl()`.

---

## Page `/produit/[slug]`

Affiche pour un produit per-store (ObjectId) :
- Badges marque · catégorie · store · stock
- **SKU** (`reference`) en code monospace + ID MongoDB
- Prix barré + prix actuel + **Économie X DT**
- Bouton lien direct vers la boutique
- **Fiche technique** (`fiche_technique` MongoDB)

Pour un produit comparatif (slug texte) : tableau multi-boutiques trié par prix.

---

## API calls (`src/lib/api/`)

```typescript
getProduits({ q, categorie, marque, prix_min, prix_max, en_promo, page })
getProduit(slug)
getCategories() / getCategorie(slug)
getMarques() / getMarque(nom)
```

Toutes les valeurs `undefined` sont filtrées avant `URLSearchParams` pour éviter le bug `"undefined"` en URL.

---

## Développement local

```bash
npm install
npm run dev        # http://localhost:3000
```

Variable d'environnement : `NEXT_PUBLIC_API_URL=https://api.toprix.tn/api/v1`

---

## Déploiement

Push sur `main` → déploiement automatique Vercel.
