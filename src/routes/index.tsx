import { createSignal } from "solid-js";
import { Title } from "solid-start";
import { Button } from "~/components/Button";
import PostItem from "~/components/PostItem";
import { postList } from "~/store/postList";

export default function Home() {
  const [page, setPage] = createSignal(1)
  const [isBottom, setIsBottom] = createSignal(false)

  return (
    <main>
      <Title>冰轩's blog</Title>
      <ul class="flex flex-col gap-12">
        {
          postList().slice(0, page() * 10).map(post =>
            <PostItem title={post.title} slug={post.slug}
              date={post.date} category={post.category}
              content="content" />
          )
        }
      </ul>
      {!isBottom() && <div class="pt-12 pb-4 w-full text-center">
        <Button primary onClick={() => {
          setPage(page() + 1)
          if (page() * 10 >= postList().length) {
            setIsBottom(true)
          }
        }}>
          加载更多
        </Button>
      </div>}
    </main>
  );
}