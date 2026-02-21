import { API_URL } from '@/lib/config'

/**
 * Fetch all product IDs for a list of categories in parallel.
 * Caps at maxTotal products total.
 */
export async function fetchProductIdsForCategories(
  categories: string[],
  maxTotal = 10000
): Promise<string[]> {
  const maxPerCat = Math.ceil(maxTotal / categories.length)

  const perCatIds = await Promise.all(
    categories.map(async (cat) => {
      const ids: string[] = []
      try {
        const res1 = await fetch(`${API_URL}/categories/${cat}/?page=1`, {
          next: { revalidate: 7200 },
        })
        if (!res1.ok) return ids

        const { data: page1, meta } = await res1.json()
        const allData = [...(page1 || [])]
        const totalPages = Math.min(
          meta?.total_pages || 1,
          Math.ceil(maxPerCat / 20)
        )

        if (totalPages > 1) {
          const remaining = await Promise.allSettled(
            Array.from({ length: totalPages - 1 }, (_, i) =>
              fetch(`${API_URL}/categories/${cat}/?page=${i + 2}`, {
                next: { revalidate: 7200 },
              }).then((r) => r.json())
            )
          )
          for (const r of remaining) {
            if (r.status === 'fulfilled') allData.push(...(r.value?.data || []))
          }
        }

        for (const p of allData) {
          if (p.id) ids.push(p.id)
        }
      } catch {}
      return ids
    })
  )

  const seen = new Set<string>()
  const urls: string[] = []
  for (const ids of perCatIds) {
    for (const id of ids) {
      if (!seen.has(id)) {
        seen.add(id)
        urls.push(id)
        if (urls.length >= maxTotal) return urls
      }
    }
  }
  return urls
}
