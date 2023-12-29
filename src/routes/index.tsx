import { createEffect, createSignal, onMount } from "solid-js";
import {
  Title,
  useRouteData,
} from "solid-start";
import server$, { createServerData$ } from "solid-start/server";
import { Button } from "~/components/Button";
import PostItem from "~/components/PostItem";
import { getPosts, getPostsPaginationCount } from "~/data/posts";

export function routeData() {
  const firstPagePosts = createServerData$<postInfo[]>(() => getPosts(0, 10));

  const pageCount = createServerData$<number>(() => getPostsPaginationCount());

  return { firstPagePosts, pageCount };
}

const fetchMorePosts = async (page: number) =>
  await server$((page) => {
    console.log(page);
    return getPosts((page - 1) * 10, 10);
  })(page);

export default function Home() {
  const { firstPagePosts, pageCount } = useRouteData<typeof routeData>();

  const [isBottom, setIsBottom] = createSignal(false);
  const [page, setPage] = createSignal(1);

  createEffect(() => {
    if (pageCount != undefined && page() >= (pageCount() ?? 1)) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  });
  
  const [posts, setPosts] = createSignal(firstPagePosts());

  createEffect(()=>{
    setPosts(firstPagePosts())
  })

  return (
    <main>
      <Title>冰轩's blog</Title>
      <div class="flex flex-col gap-12">
        {posts()?.map((post) => (
          <PostItem postInfo={post} />
        ))}
      </div>
      {!isBottom() && (
        <div class="pt-12 pb-4 w-full text-center">
          <Button
            primary
            onClick={() => {
              setPage((page) => page + 1);

              fetchMorePosts(page()).then((fetched) => {
                setPosts((posts) => [...(posts ?? []), ...fetched]);
              });

              if (
                pageCount != undefined &&
                page() >= (pageCount() ?? 1)
              ) {
                setIsBottom(true);
              }
            }}
          >
            加载更多
          </Button>
        </div>
      )}
    </main>
  );
}
