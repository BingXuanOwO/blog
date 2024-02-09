import { createEffect, createSignal } from "solid-js";
import { Button } from "./Button";
import { useSearchParams } from "@solidjs/router";

export function PaginationButtons(props: { pageCount: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = createSignal(
    parseInt(searchParams.page ?? "") > 1 ? parseInt(searchParams.page ?? "") : 1
  )

  createEffect(() => {
    setPage(parseInt(searchParams.page ?? "") > 1 ? parseInt(searchParams.page ?? "") : 1)
    window.scrollTo(0,0)
  })

  return (
    <div class="flex justify-between my-4">
      <Button
        disabled={page() <= 1}
        onClick={() => {
          setSearchParams({ page: page() - 1 })
        }}
      >上一页</Button>

      <span>{page()}/{props.pageCount}</span>

      <Button
        primary
        disabled={page() >= props.pageCount}
        onClick={() => {
          setSearchParams({ page: page() + 1 })
        }}
      >下一页</Button>
    </div>
  )

}