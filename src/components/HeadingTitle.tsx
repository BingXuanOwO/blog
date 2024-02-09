export function HeadingTitle(props: {
  title?: string,
  secondaryTitle?: string,
  page?: number
}) {
  return (
    <>
      <h1>
        <span class="text-main">{props.title}</span>
        {props.secondaryTitle}
      </h1>
    </>
  )
}