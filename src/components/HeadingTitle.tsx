import { JSX } from "solid-js";
import { renderToString } from "solid-js/web";
import { Title } from "solid-start";

export function HeadingTitle(props: {
  title?: string,
  secondaryTitle?: string,
  page?: number
}) {
  return (
    <>
      <Title>{props.title}{props.secondaryTitle} - {props.page && `第${props.page}页 - `}冰轩's blog</Title>
      <h1 class="text-6xl font-medium ">
        <span class="text-main">{props.title}</span>
        {props.secondaryTitle}
        </h1>
    </>
  )
}