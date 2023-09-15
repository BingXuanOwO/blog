import { createEffect, createSignal } from "solid-js";
import { RouteDataArgs, Title, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { Button } from "~/components/Button";
import PostItem from "~/components/PostItem";
import { getPosts } from "~/data/posts";

export function routeData({params,location}: RouteDataArgs) {
  return createServerData$<postInfo[]>(
    () => getPosts(),
  );
}

export default function Home() {
  const posts = useRouteData<typeof routeData>();

  const [page, setPage] = createSignal(1)
  const [isBottom, setIsBottom] = createSignal(true)

  createEffect(() => {
    if (page() * 10 >= (posts() ?? []).length) {
      setIsBottom(true)
    } else {
      setIsBottom(false)
    }
  })

  return (
    <main>
      <Title>冰轩's blog</Title>
      <ul class="flex flex-col gap-12">
        {
          (posts() ?? []).slice(0, page() * 10).map(post =>
            <PostItem title={post.title} slug={post.slug}
              date={new Date(post.date ?? 0)} category={post.category}
              content="content" />
          )
        }
      </ul>
      {!isBottom() && <div class="pt-12 pb-4 w-full text-center">
        <Button primary onClick={() => {
          setPage(page() + 1)
          if (page() * 10 >= (posts() ?? []).length) {
            setIsBottom(true)
          }
        }}>
          加载更多
        </Button>
      </div>}
    </main>
  );
}