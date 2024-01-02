import { getPosts } from "./posts";

const getCategories = async () => [...new Set<string>((await getPosts()).map(e => e.category))]

export { getCategories }