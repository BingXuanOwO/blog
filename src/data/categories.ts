import { getPosts } from "./posts";

const getCategories = () => [...new Set<string>(getPosts().map(e => e.category))]

export { getCategories }