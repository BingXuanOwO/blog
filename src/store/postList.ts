import { createSignal } from "solid-js";

const [postList, setPostList] = createSignal<post[]>([])

export {postList, setPostList}