// Loader Cloudinary pour Next.js Image
// Utilise le mode "fetch" : transforme et met en cache les images externes via CDN Cloudinary

const CLOUD_NAME = 'dbayeaedd'

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
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${params}/${src}`
}
