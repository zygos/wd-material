import formatImage from './formatImage'

export type Image = {
  id: number
  url: string
  description: string | null
}

export default async function fetchImages(): Promise<Image[]> {
  const response = await fetch('https://some-api.com/images')
  const images: Image[] = await response.json()

  return images.map(formatImage)
}
