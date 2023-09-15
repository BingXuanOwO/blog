import fs from "fs"
import path from "path"
import matter from "gray-matter"

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

  const exists = fs.existsSync(filePath)
  if (!exists) {
    throw (Error("Not Found", {}))
  }

  const data = fs.readFileSync(filePath)
  const parsedMatter = matter(data.toString())

  return {
    info: {
      slug: slug,
      title: parsedMatter.data["title"],
      date: parsedMatter.data["date"],
      category: parsedMatter.data["category"],
    },
    content: parsedMatter.content
  }
}