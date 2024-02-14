import { Root } from "mdast-util-from-markdown/lib";
import { pageSize } from "../utils/config";

export async function getPost(slug: string): Promise<{ info?: PostInfo; content?: Root; }> {
  try {
    const post = await import(`../../.generated/posts/${slug}.json`)
    return {info: post.info, content: post.content};
  } catch (e) {
    return {info: undefined, content: undefined};
  }
}


export async function getPosts(
  page?: number,
  category?: string
): Promise<PostInfo[]> {
  "use server";

  let postList = (await import("../../.generated/posts.json"))?.default;

  if (category !== undefined) {
    postList = postList.filter((e) => e.category == category);
  }

  if (page !== undefined) {
    const offset = (page - 1) * pageSize;
    const limit = page * pageSize;

    return postList.slice(offset, limit);
  }

  return postList;
}

export async function getPageCount(category?: string): Promise<number> {
  "use server";
  const posts = await getPosts(undefined, category);
  return Math.ceil(posts.length / pageSize);
}

export async function getCategories(): Promise<string[]> {
  "use server";
  return (await import("../../.generated/categories.json")).default;
}
