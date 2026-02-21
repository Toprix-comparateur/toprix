// Loader Cloudinary pour Next.js Image
// Utilise l'Auto Upload Mapping : chaque boutique est mappée à un dossier Cloudinary
//   mytek      → https://www.mytek.tn
//   tunisianet → https://www.tunisianet.com.tn
//   spacenet   → https://spacenet.tn

const CLOUD_NAME = 'dbayeaedd'

const STORE_PREFIXES: [string, string][] = [
  ['https://www.mytek.tn',           'mytek'],
  ['https://www.tunisianet.com.tn',  'tunisianet'],
  ['https://spacenet.tn',            'spacenet'],
]

function toCloudinaryPath(src: string): string {
  for (const [base, folder] of STORE_PREFIXES) {
    if (src.startsWith(base)) {
      const path = src.slice(base.length).replace(/^\/+/, '')
      return `${folder}/${path}`
    }
  }
  // Fallback : fetch direct pour toute autre URL
  return `fetch/${encodeURIComponent(src)}`
}

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}): string {
  const params = `w_${width},f_auto,q_${quality ?? 'auto'}`
  const path = toCloudinaryPath(src)

  // Si fallback fetch, l'URL est déjà complète dans `path`
  if (path.startsWith('fetch/')) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/${path}`
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${params}/${path}`
}
