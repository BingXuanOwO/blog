import fs from "fs"
import path from "path"
import matter, { GrayMatterFile } from "gray-matter"

const postStoragePath = path.join(process.cwd(), "posts")

/**
 * Get a specific post
 * @returns {postInfo} info
 * @returns {string} content
 */
export function getPost(slug: string): { info: postInfo, content: string } {
  const filePath = path.join(
    postStoragePath,
    slug + ".md"
  )

  //console.log("content: " + getPostPlainTextContent(slug))

  const exists = fs.existsSync(filePath)
  if (!exists) {
    throw (Error("Not Found", {}))
  }

  const data = fs.readFileSync(filePath)
  const parsedMatter = matter(data.toString())

  return {
    info: {
      ...readInfoFromMatter(parsedMatter),
      slug: slug
    },
    content: parsedMatter.content
  }
}

export function readInfoFromMatter(matter: GrayMatterFile<Buffer | string>): postInfo {
  const plainContent = matter.content.replace(/<img.*<\/img>/g,"").replace(/<\/?.+?>/g, "")

  return {
    title: matter.data["title"],
    date: matter.data["date"],
    category: matter.data["category"],
    preview: plainContent.length > 100 ? plainContent.slice(0,100) + '...' : plainContent
  }
}
