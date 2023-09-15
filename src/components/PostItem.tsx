import { A } from "solid-start";
import { parseDateToString } from "~/utils/date";

export default function PostItem(props: {
  title?: string,
  date?: Date,
  category?: string,
  content?: string,
  slug?: string,
  class?: string
}) {
  return (
    <A href={`/posts/${props.slug}`} class={`flex flex-col gap-2 hover:text-white ${props.class}`}>
      <h1 class="text-4xl font-medium">{props.title}</h1>

      <div class="text-xs opacity-60 text-ellipsis overflow-hidden gap-3 flex">
        <span>{props.date && parseDateToString(props.date)}</span>
        {props.category && <span>{props.category}</span>}
      </div>

      <span class=" w-full overflow-clip text-ellipsis">{props.content}</span>
    </A>
  )
}