import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { createSignal } from "solid-js"
import { readInfoFromMatter } from "./post"

const postStoragePath = path.join(process.cwd(), "posts")

const [postListCache, setPostListCache] = createSignal<postInfo[]>()
let watchedPostList = false

/**  
 * Get all posts by reading folder
 * @returns {postInfo[]}
*/
function getPostsFromFiles(): postInfo[] {
  return fs
    .readdirSync(path.join(process.cwd(), "posts"))
    .map((slug) => {
      const fileContent = fs.readFileSync(path.join(postStoragePath, slug))
      const frontMatter = matter(fileContent)
       
      return {
        ...readInfoFromMatter(frontMatter),
        slug: slug.slice(0, slug.lastIndexOf('.'))
      }
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )
}

/**  
 * Get all posts
 * @param {number?} offset
 * @param {number?} limit
 * @returns {postInfo[]}
*/
export function getPosts(offset?: number, limit?: number): postInfo[] {
  if (postListCache() != void 0) {
    console.log("fetched post list from cache")
    return postListCache()?.slice(offset, (offset ?? 0) + (limit ?? -1)) ?? []
  }

  if (!watchedPostList) {
    console.log("watched post store")
    watchPostList();
    watchedPostList = true;
  }

  console.log("fetched post list by fs reading")
  setPostListCache(getPostsFromFiles())
  return postListCache()?.slice(offset, (offset ?? 0) + (limit ?? -1)) ?? []
}

/**
 * Get posts from specific category
 * @param {string} category 
 * @returns {postInfo[]}
 */
export function getPostsFromCategory(category: string, offset?: number, limit?: number): postInfo[] {
  return getPosts(offset,limit).filter(e => e.category == category)
}

/**
 * Get pagination count of post
 * @returns {number}
 */
export function getPostsPaginationCount(): number {
  const posts = getPosts()
  return Math.ceil(posts.length / 10)
}

/**
 * Get pagination count of post from specific category
 * @returns {number}
 */
export function getPostsPaginationCountFromCategory(category: string,): number {
  const posts = getPostsFromCategory(category)
  return Math.ceil(posts.length / 10)
}

function watchPostList() {
  fs.watch(postStoragePath, () => {
    console.log("updating post list cache")
    setPostListCache(getPostsFromFiles())
  })
}
