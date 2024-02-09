import { createAsync, useParams, useSearchParams } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { HeadingTitle } from "~/components/HeadingTitle";
import { PaginationButtons } from "~/components/PaginationButtons";
import PostItem from "~/components/PostItem";
import { getPageCount, getPosts } from "~/data/posts";

const getCategoryInfo = async (name: string, page: number) => {
  "use server";
  const posts = await getPosts(page, decodeURI(name));
  const paginationCount = await getPageCount(decodeURI(name));

  return { posts, paginationCount }
}

export default function Category() {
  const params = useParams()
  const [searchParams] = useSearchParams();

  const [page, setPage] = createSignal(
    parseInt(searchParams.page ?? "") > 1 ? parseInt(searchParams.page ?? "") : 1
  )

  console.log(page())

  createEffect(() => {
    setPage(parseInt(searchParams.page ?? "") > 1 ? parseInt(searchParams.page ?? "") : 1)
  })
  
  const categoryInfo = createAsync(async()=>await getCategoryInfo(params.name,page()));

  return (
    <main class="gap-8 flex flex-col">
      <HeadingTitle page={page()}
        title={decodeURI(params.name)}
        secondaryTitle="中的文章" />
      <div class="flex flex-col gap-8">
        {
          categoryInfo()?.posts
            ?.map(post =>
              <PostItem postInfo={post} hideCategory/>
            )
        }
      </div>
      <PaginationButtons pageCount={categoryInfo()?.paginationCount ?? 0} />
    </main>
  )
}