import { JSX } from "solid-js";

export function Button(props: {
  disabled?: boolean,
  onClick?: (event: MouseEvent) => void,
  children?: JSX.Element,
  primary?: boolean
}) {
  return (
    <button class={`px-4 py-2 rounded  bg-container
      ${props.primary && "text-main"}
      ${props.disabled && "cursor-not-allowed opacity-50"}
      `}
      onclick={(event) => !props.disabled &&
      props.onClick &&
      props.onClick(event)}>
      {props.children}
    </button>
  )
}