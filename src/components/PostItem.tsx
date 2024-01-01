import dayjs from "dayjs";
import { A } from "solid-start";
import { parseDateToString } from "~/utils/date";

export default function PostItem(props: {
  postInfo: postInfo,
  hideCategory?: boolean,
  class?: string
}) {
  console.log(props.postInfo.date)
  return (
    <A href={`/posts/${props.postInfo.slug}`} class={`flex flex-col gap-2 hover:text-white ${props.class}`}>
      <h2>{props.postInfo.title}</h2>

      <div class="text-xs opacity-60 text-ellipsis overflow-hidden gap-3 flex">
        <span>{
          props.postInfo.date != undefined && 
          dayjs(props.postInfo.date).format("YYYY-MM-DD HH:MM")
        }</span>

        {!props.hideCategory && props.postInfo.category && <span>{props.postInfo.category}</span>}
      </div>

      <span class="w-full overflow-clip text-ellipsis">{props.postInfo.preview}</span>
    </A>
  )
}