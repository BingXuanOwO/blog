import { createEffect, createSignal } from "solid-js";
import { useParams, useSearchParams } from "solid-start";
import { Button } from "~/components/Button";
import { HeadingTitle } from "~/components/HeadingTitle";
import PostItem from "~/components/PostItem";
import { postList } from "~/store/postList";

export default function Category() {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const [filtedList, setFiltedList] = createSignal(postList().filter(
    e => e.category == decodeURI(params.name)
  ))

  const [page, setPage] = createSignal(
    parseInt(searchParams.page) > 1 ? parseInt(searchParams.page) : 1
  )
  const [pageTotal, setPageTotal] = createSignal(
    Math.ceil(filtedList().length / 10)
  )

  createEffect(() => {
    setPage(parseInt(searchParams.page) > 1 ? parseInt(searchParams.page) : 1)
  })

  createEffect(() => {
    setFiltedList(postList().filter(
      e => e.category == decodeURI(params.name)
    ))

    setPageTotal(Math.ceil(filtedList().length / 10))
  })

  return (
    <main class="gap-8 flex flex-col">
      <HeadingTitle page={page()}
        title={decodeURI(params.name)}
        secondaryTitle="中的文章" />
      <ul class="flex flex-col gap-8">
        {
          filtedList()
            .slice((page() - 1) * 10, page() * 10)
            .map(post =>
              <PostItem title={post.title} slug={post.slug}
                date={post.date} content="content" />
            )
        }
      </ul>
      <div class="flex justify-between my-4">
        <Button
          disabled={page() <= 1}
          onClick={() => {
            setSearchParams({ page: page() - 1 })
          }}
        >上一页</Button>

        <span>{page()}/{pageTotal()}</span>

        <Button
          primary
          disabled={page() >= pageTotal()}
          onClick={() => {
            setSearchParams({ page: page() + 1 })
          }}
        >下一页</Button>
      </div>
    </main>
  )
}