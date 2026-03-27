export function getImageUrl(imgUrl?: string | null): string {
  if (!imgUrl) return '/placeholder.jpg'

  if (imgUrl.startsWith('http')) return imgUrl

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  return `${baseUrl}/public${imgUrl}`
}
