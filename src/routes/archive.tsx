import { createEffect, createSignal } from "solid-js";
import { Navigate, Title, useNavigate, useParams, useSearchParams } from "solid-start";
import { Button } from "~/components/Button";
import { HeadingTitle } from "~/components/HeadingTitle";
import PostItem from "~/components/PostItem";
import { postList } from "~/store/postList";

export default function Archive() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = createSignal(parseInt(searchParams.page) > 1 ? parseInt(searchParams.page) : 1)
  const pageTotal = Math.ceil(postList().length / 10)

  createEffect(() => {
    setPage(parseInt(searchParams.page) > 1 ? parseInt(searchParams.page) : 1)
  })

  return (
    <main class="gap-8 flex flex-col">
      <HeadingTitle title="归档" page={page()} />
      <div class="flex flex-col gap-8">
        {
          postList()
            .slice((page() - 1) * 10, page() * 10)
            .map((post, index, array) => {
              if (index <= 0 ||
                array[index - 1].date.getMonth() !== post.date.getMonth() ||
                array[index - 1].date.getFullYear() !== post.date.getFullYear()
              ) {
                return (
                  <>
                    <h2 class="text-4xl font-medium mt-4">
                      {post.date.getFullYear()}.
                      {post.date.getMonth() + 1}
                    </h2>

                    <PostItem title={post.title} slug={post.slug}
                      date={post.date} content="content"
                      category={post.category} class="ml-6" />
                  </>
                )
              }

              return <PostItem title={post.title} slug={post.slug}
                date={post.date} content="content"
                category={post.category} class="ml-6" />
            }
            )
        }
      </div>
      <div class="flex justify-between my-4">
        <Button
          disabled={page() <= 1}
          onClick={() => {
            setSearchParams({ page: page() - 1 })
          }}
        >上一页</Button>

        <span>{page()}/{pageTotal}</span>

        <Button
          primary
          disabled={page() >= pageTotal}
          onClick={() => {
            setSearchParams({ page: page() + 1 })
          }}
        >下一页</Button>
      </div>
    </main>
  );
}
