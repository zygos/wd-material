import type { Image } from './'

export default (image: Image) => {
  if (!image.description) return image

  return {
    ...image,
    description: image.description
      ? formatDescription(image.description)
      : image.description,
  }
}

function formatDescription(description: string) {
  return description
    .replace(/[^\w\s]/g, '')
    .replace(/\s\s+/g, ' ')
    .trim()
}
