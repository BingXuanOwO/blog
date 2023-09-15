import "~/highLight.css"
import { marked } from "marked";
import { ErrorBoundary, RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { getPost } from "~/data/post";
import { parseDateToString } from "~/utils/date";
import { HeadingTitle } from "~/components/HeadingTitle";
import { ReturnByError } from "~/components/ReturnByError";

export function routeData({ params }: RouteDataArgs) {
  return createServerData$<
    {
      found: boolean,
      internalError?: boolean
      info?: postInfo,
      content?: string,
    },
    string
  >
    (
      async (slug) => {
        try {
          const post = getPost(slug)
          return {
            info: post.info,
            content: post.content,
            found: true
          }
        } catch (err) {
          if (err instanceof Error &&
            err.message == "Not Found") {
            return { found: false }
          }

          console.log(err)
          return { found: false, internalError: true }
        }
      },
      { key: () => params.slug }
    );
}

export default function Post() {
  const post = useRouteData<typeof routeData>()
  console.log(post()?.info)
  return (
    <ReturnByError
      found={post()?.found}
      internalError={post()?.internalError}
    >
      <main class="gap-6 flex flex-col">
        <HeadingTitle title={post()?.info?.title} />
        <div class="opacity-60 text-ellipsis overflow-hidden gap-4 flex">
          <span>{parseDateToString(new Date(post()?.info?.date ?? 0))}</span>
          <span>{post()?.info?.category}</span>
        </div>
        <ErrorBoundary>
          <MarkdownParagraph children={post()?.content} />
        </ErrorBoundary>
      </main>
    </ReturnByError>
  )
}

function MarkdownParagraph(props: { children?: string }) {
  return (
    <article class="flex gap-3 flex-col
        [&_h1]:text-5xl [&_h1]:font-medium
        [&_h2]:text-4xl [&_h2]:font-medium
        [&_h3]:text-3xl [&_h3]:font-medium
        [&_h4]:text-2xl [&_h4]:font-medium
        [&_h5]:text-xl [&_h5]:font-medium
        [&_h6]:text-lg [&_h6]:font-medium

        [&_ul]:list-inside [&_ul]:list-disc [&_ul_li]:marker:text-main [&_ul_li]:ml-2
        [&_ol]:list-inside [&_ol]:list-decimal [&_ol_li]:ml-2

        [&_code]:bg-container [&_code]:px-2 [&_code]:rounded

        [&_pre_code]:bg-transparent [&_pre_code]:px-0
        [&_pre]:bg-container [&_pre]:p-4 [&_pre]:rounded

        [&_blockquote]:border-l-4 [&_blockquote]:border-l-main
        [&_blockquote]:pl-6 [&_blockquote]:bg-container
        [&_blockquote]:p-4

        [&_img]:rounded [&_img]:mx-auto
        "
      innerHTML={marked.parse(props.children ?? "")} />
  )
}