import { createSignal } from "solid-js";

const [categories, setCategories] = createSignal<Set<string>>(new Set())

export {categories, setCategories}