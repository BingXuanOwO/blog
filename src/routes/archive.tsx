import { createEffect, createSignal } from "solid-js";
import { RouteDataArgs, useRouteData, useSearchParams } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Button } from "~/components/Button";
import { HeadingTitle } from "~/components/HeadingTitle";
import { PaginationButtons } from "~/components/PaginationButtons";
import PostItem from "~/components/PostItem";
import { getPosts, getPostsByPage, getPostsPaginationCount } from "~/data/posts";

export function routeData({ location }: RouteDataArgs) {
  const posts = createServerData$<postInfo[], number>(
    page => {
      const posts = getPostsByPage(page)
      return posts
    },
    {
      key: () => parseInt(location.query.page ?? 1)
    }
  );

  const paginationCount = createServerData$<number>(
    () => {
      const posts = getPostsPaginationCount()
      return posts
    },
  );

  return { posts, paginationCount }
}

export default function Archive() {
  const [searchParams] = useSearchParams();
  const { posts, paginationCount } = useRouteData<typeof routeData>()

  return (
    <main class="gap-8 flex flex-col">
      <HeadingTitle title="归档" page={parseInt(searchParams.page ?? 1)} />
      <div class="flex flex-col gap-8">
        {
          posts()
            ?.map((post, index, array) => {
              const date = new Date(post.date ?? 0)
              if (index <= 0 ||
                new Date(array[index - 1].date ?? 0).getMonth() !== date.getMonth() ||
                new Date(array[index - 1].date ?? 0).getFullYear() !== date.getFullYear()
              ) {
                return (
                  <>
                    <h2 class="text-4xl font-medium mt-4">
                      {date.getFullYear()}.
                      {date.getMonth() + 1}
                    </h2>

                    <PostItem title={post.title} slug={post.slug}
                      date={date} content="content"
                      category={post.category} class="ml-6" />
                  </>
                )
              }

              return <PostItem title={post.title} slug={post.slug}
                date={date} content="content"
                category={post.category} class="ml-6" />
            }
            )
        }
      </div>
      <PaginationButtons pageCount={paginationCount() ?? 0} />
    </main>
  );
}
