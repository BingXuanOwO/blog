import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { createSignal } from "solid-js"

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
      var frontMatter = readFrontmatterFromSlug(slug)
      return {
        title: frontMatter.title,
        date: frontMatter.date,
        category: frontMatter.category,
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
 * @returns {postInfo[]}
*/
export function getPosts(): postInfo[] {
  if (postListCache() != void 0) {
    console.log("fetched post list from cache")
    return postListCache() ?? []
  }

  if (!watchedPostList) {
    console.log("watched post store")
    watchPostList();
    watchedPostList = true;
  }

  console.log("fetched post list by fs reading")
  setPostListCache(getPostsFromFiles())
  return postListCache() ?? []
}

/**  
 * Get posts from specific page
 * @param {number} page
 * @returns {postInfo[]}
*/
export function getPostsByPage(page: number): postInfo[] {
  const posts = getPosts()
  return getPostsByPageFromList(posts, page)
}

/**
 * Get posts from specific category
 * @param {string} category 
 * @returns {postInfo[]}
 */
export function getPostsFromCategory(category: string): postInfo[] {
  return getPosts().filter(e => e.category == category)
}

/**
 * Get posts from specific category and page
 * @param {string} category 
 * @param {number} page
 * @returns {postInfo[]}
 */
export function getPostsFromCategoryByPage(category: string, page: number): postInfo[] {
  const filteredPosts = getPostsFromCategory(category)

  return getPostsByPageFromList(
    filteredPosts,
    page
  )
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


function getPostsByPageFromList(
  postList: postInfo[], page: number
) {
  const firstItemIndex = (page - 1) * 10
  const nextPageFirstItemIndex = page * 10
  return postList.slice(
    firstItemIndex,
    nextPageFirstItemIndex
  )
}

function watchPostList() {
  fs.watch(postStoragePath, () => {
    console.log("updating post list cache")
    setPostListCache(getPostsFromFiles())
  })
}

function readFrontmatterFromSlug(slug: string): {
  title: string, date: number, category: string
} {
  var fileContent = fs.readFileSync(path.join(postStoragePath, slug))
  return {
    title: matter(fileContent).data["title"],
    date: parseInt(matter(fileContent).data["date"]),
    category: matter(fileContent).data["category"]
  }
}
