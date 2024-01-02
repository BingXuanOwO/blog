import { Root } from "mdast-util-from-markdown/lib";

/**
 * Get a specific post
 * @returns {postInfo} info
 * @returns {string} content
 */
export async function getPost(slug: string): Promise<{ info: postInfo; content: Root; }> {
  const post = await import(`../../generated/posts/${slug}.json`)
  console.log(post);

  return {info: post.info, content: post.content};
}
