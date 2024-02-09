import { createAsync, useParams } from "@solidjs/router";
import { HeadingTitle } from "~/components/HeadingTitle";
import PostItem from "~/components/PostItem";
import { getPosts } from "~/data/posts";

async function getPostsByDate(year: number, month: number): Promise<PostInfo[]> {
  "use server";
  const posts = await getPosts();
  const filteredPost = posts.filter((post) => {
    const date = new Date(post.date);
    return date.getMonth() === month - 1 && date.getFullYear() === year;
  });

  return filteredPost;
}

export default function Archive() {
  const params = useParams();
  console.log(params.year);
  console.log(params.month);
  const posts = createAsync(
    async () => await getPostsByDate(parseInt(params.year), parseInt(params.month))
  );

  return (
    <main class="gap-8 flex flex-col">
      <HeadingTitle
        title={`${params.year}年${params.month}月`}
        secondaryTitle="的文章"
      />
      <div class="flex flex-col gap-8">
        {posts()?.map((post) => (
          <PostItem postInfo={post} />
        ))}
      </div>
    </main>
  );
}
