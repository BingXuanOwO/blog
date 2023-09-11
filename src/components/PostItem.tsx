import { A } from "@solidjs/router";

export default function PostItem(props: {
  title: string,
  date: string,
  category?: string,
  content: string,
  path: string
}) {
  return (
    <A href={`/posts/${props.path}`} class="flex flex-col gap-2 hover:text-white">
      <h1 class="text-4xl font-medium">{props.title}</h1>

      <div class="text-xs opacity-60 text-ellipsis overflow-hidden gap-4 flex">
        <span>{props.date}</span>
        {props.category && <span>{props.category}</span>}
      </div>

      <span class=" w-full overflow-clip text-ellipsis">{props.content}</span>
    </A>
  )
}