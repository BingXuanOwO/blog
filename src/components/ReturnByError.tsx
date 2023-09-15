import { JSX } from "solid-js";
import { NotFound } from "~/errorPages/404";
import { InternalServerError } from "~/errorPages/500";

export function ReturnByError(props: {
  found?: boolean,
  internalError?: boolean,
  children: JSX.Element
}) {
  return (<>
    {
      props?.found === false &&
      !props?.internalError &&
      <NotFound />
    }

    {
      props?.internalError === true &&
      <InternalServerError />
    }

    {
      props?.found === true && props.children
    }
  </>)
}