// Configuration de l'API backend Django

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

export const API_TIMEOUT = 10000

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`

  const reponse = await fetch(url, {
    ...options,
  })

  if (!reponse.ok) {
    throw new Error(`Erreur API ${reponse.status}: ${reponse.statusText}`)
  }

  return reponse.json()
}
