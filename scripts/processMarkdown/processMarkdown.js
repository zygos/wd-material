import 'dotenv/config'
import { replace } from 'rambda'
import { pipeAsync } from './utils.js'

// Add <br> tags round headlines (#, ##, ###)
const addBrTagsHeadlines = replace(/(\n|^)(#+)/g, '$1<br>\n\n$2')
const addBrTagsBoldLines = replace(/(\n)(\*\*|__)/g, '$1<br>\n\n$2')

// Replace markdown images with <div><img /></div> tags
// const replaceImageTags = replace(/!\[[^\]]*\]\(([^\)]+)\)/g, '<div><img src="$1" /></div>')
const removeSingleLineComments = replace(/\n<!--[^\n]*-->/g, '')

// Remove <br> tags in code blocks, except in HTML code blocks
const removeBrTagsInCodeBlocks = replace(/```[\s\S]*?```/g, (codeBlock) => {
  const isHtmlCodeBlock = codeBlock.startsWith('```htm')

  if (isHtmlCodeBlock) return codeBlock

  return codeBlock.replace(/<br>\n?/g, '')
})

export const processMarkdown = pipeAsync(
  removeSingleLineComments,
  addBrTagsHeadlines,
  addBrTagsBoldLines,

  // too much of a hassle
  // hostImages,

  // no longer necessary as TC supports native markdown image links
  // replaceImageTags,

  removeBrTagsInCodeBlocks,
)

// Host images on imgur.com and replace local markdown image links with imgur links
// const hostImages = async (markdown) => {
//   const imageLinks = markdown.match(/!\[.*\]\(.*\)/g)

//   if (!imageLinks) return markdown

//   const results = await imageLinks
//     .map(link => async () => {
//       const url = link.match(/\((.*)\)/)[1]

//       console.log('Uploading image to imgur.com...', url)

//       const { data } = await axios
//         .post('https://api.imgur.com/3/image',
//         {
//           image: url,
//         },
//         {
//           headers: {
//             Authorization: `Client-ID ${imgurClientId}`,
//           },
//         },
//       )

//       return {
//         linkLocal: link,
//         url: data.data.link,
//       }
//     })
//     .reduce(intoSequentialPromise, [])

//   // replace local markdown image links with imgur links
//   return results
//     .reduce((markdown, { linkLocal, url }) => markdown.replace(linkLocal, url), markdown)
// }
