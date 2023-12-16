import { RouteDataArgs, useParams, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { HeadingTitle } from "~/components/HeadingTitle";
import PostItem from "~/components/PostItem";
import { getPostsByYearAndMonth } from "~/data/archive";

export function routeData({ params }: RouteDataArgs) {
  const posts = createServerData$<postInfo[], [number, number]>(
    ([year, month]) => {
      const posts = getPostsByYearAndMonth(year, month)
      return posts
    },
    {
      key: () => [parseInt(params.year), parseInt(params.month)]
    }
  );

  return { posts }
}

export default function Archive() {
  const { posts } = useRouteData<typeof routeData>()
  const params = useParams()

  return (
    <main class="gap-8 flex flex-col">
      <HeadingTitle title={`${params.year}年${params.month}月`} secondaryTitle="的文章"/>
      <div class="flex flex-col gap-8">
        {
          posts()
            ?.map((post) =>
              <PostItem postInfo={post} />
            )
        }
      </div>
    </main>
  );
}
