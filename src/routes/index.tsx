import { createAsync } from "@solidjs/router";
import { createEffect, createSignal, on, onMount } from "solid-js";

import { Button } from "~/components/Button";
import PostItem from "~/components/PostItem";
import { getPosts, getPageCount } from "~/data/posts";



export default function Home() {
  const pageCount = createAsync(async () => await getPageCount());

  const [page, setPage] = createSignal(1);

  const fetchedPosts = createAsync(async () => await getPosts(page()));

  const [posts, setPosts] = createSignal<PostInfo[] | undefined>(
    fetchedPosts()
  );

  const appendIntoPosts = (newPosts: PostInfo[]) => {
    setPosts([...(posts() ?? []), ...newPosts]);
  };

  function nextPage() {
    if (page() <= (pageCount() ?? 0)) {
      setPage((page) => page + 1);
    }
  }

  createEffect(
    on(fetchedPosts, () => {
      const fetched = fetchedPosts();
      if (fetched === undefined || fetched.length <= 0) {
        return;
      }

      if (page() == 1) {
        setPosts(fetched);
        return;
      }

      appendIntoPosts(fetched);
    })
  );

  return (
    <main>
      <title>冰轩's blog</title>
      <div class="flex flex-col gap-12">
        {posts()?.map((post) => (
          <PostItem postInfo={post} />
        ))}
      </div>
      <div class="pt-8 pb-4 w-full text-center">
        {page() < (pageCount() ?? 0) && (
          <Button primary onClick={nextPage}>
            加载更多
          </Button>
        )}
      </div>
    </main>
  );
}
