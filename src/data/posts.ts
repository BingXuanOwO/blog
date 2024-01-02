import fs from "fs";
import path from "path";

const postListFilePath = path.join(
  "./generated",
  "posts.json"
);

/**
 * Get all posts
 * @param {number?} offset
 * @param {number?} limit
 * @returns {postInfo[]}
 */
export async function getPosts(offset?: number, limit?: number): Promise<postInfo[]> {
  const postList = await import("~/../generated/posts.json");
  // console.log(postList.default)
  // const postList = JSON.parse(fs.readFileSync(postListFilePath).toString());
  return (
    postList.default?.slice(
      offset,
      limit == undefined ? undefined : (offset ?? 0) + limit
    ) ?? []
  );
}

/**
 * Get posts from specific category
 * @param {string} category
 * @returns {postInfo[]}
 */
export async function getPostsFromCategory(
  category: string,
  offset?: number,
  limit?: number
): Promise<postInfo[]> {
  const posts = await getPosts();
  return posts.filter((e) => e.category == category);
}

/**
 * Get pagination count of post
 * @returns {number}
 */
export async function getPostsPaginationCount(): Promise<number> {
  const posts = await getPosts();
  return Math.ceil(posts.length / 10);
}

/**
 * Get pagination count of post from specific category
 * @returns {number}
 */
export async function getPostsPaginationCountFromCategory(category: string): Promise<number> {
  const posts = await getPostsFromCategory(category);
  return Math.ceil(posts.length / 10);
}
