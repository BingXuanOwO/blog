import { createEffect, createSignal } from "solid-js";
import { RouteDataArgs, useParams, useRouteData, useSearchParams } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { HeadingTitle } from "~/components/HeadingTitle";
import { PaginationButtons } from "~/components/PaginationButtons";
import PostItem from "~/components/PostItem";
import { getPostsFromCategory, getPostsFromCategoryByPage, getPostsPaginationCount, getPostsPaginationCountFromCategory } from "~/data/posts";

export function routeData({ params, location }: RouteDataArgs) {
  const posts = createServerData$<postInfo[], [name: string, page: number]>(
    ([name, page]) => {
      const posts = getPostsFromCategoryByPage(name, page)
      console.log(page)
      return posts
    },
    {
      key: () => [
        decodeURI(params.name),
        parseInt(location.query.page ?? 1)
      ]
    }
  );

  const paginationCount = createServerData$<number, string>(
    (name) => {
      const posts = getPostsPaginationCountFromCategory(name)
      return posts
    },
    { key: () => decodeURI(params.name), }
  );

  return { posts, paginationCount }
}

export default function Category() {
  const { posts, paginationCount } = useRouteData<typeof routeData>();

  const params = useParams()
  const [searchParams] = useSearchParams();

  const [page, setPage] = createSignal(
    parseInt(searchParams.page) > 1 ? parseInt(searchParams.page) : 1
  )

  createEffect(() => {
    setPage(parseInt(searchParams.page) > 1 ? parseInt(searchParams.page) : 1)
  })

  return (
    <main class="gap-8 flex flex-col">
      <HeadingTitle page={page()}
        title={decodeURI(params.name)}
        secondaryTitle="中的文章" />
      <ul class="flex flex-col gap-8">
        {
          posts()
            ?.map(post =>
              <PostItem title={post.title} slug={post.slug}
                date={new Date(post.date ?? 0)} content="content" />
            )
        }
      </ul>
      <PaginationButtons pageCount={paginationCount() ?? 0} />
    </main>
  )
}