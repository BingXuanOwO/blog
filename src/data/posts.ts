import { pageSize } from "./config";

/**
 * Get all posts
 * @param {number?} page
 * @param {string?} category
 * @returns {PostInfo[]}
 */
export async function getPosts(
  page?: number,
  category?: string
): Promise<PostInfo[]> {
  "use server";

  let postList = (await import("~/../.generated/posts.json"))?.default;

  if (category !== undefined) {
    postList = postList.filter((e) => e.category == category);
  }

  console.log("pagesize: %d", pageSize)

  if (page !== undefined) {
    const offset = (page - 1) * pageSize;
    const limit = page * pageSize;

    return postList.slice(offset, limit);
  }

  return postList;
}

/**
 * Get pagination count of post from specific category
 * @returns {number}
 */
export async function getPageCount(category?: string): Promise<number> {
  "use server";
  const posts = await getPosts(undefined, category);
  return Math.ceil(posts.length / pageSize);
}

/**
 * Get category list
 * @returns {string[]}
 */
export async function getCategories (): Promise<string[]> {
  "use server";
  return (await import("~/../.generated/categories.json")).default;
}
