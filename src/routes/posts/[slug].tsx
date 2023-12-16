import hljs from "highlight.js";
import "~/highLight.css"
import { marked } from "marked";
import { onMount } from "solid-js";
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
          const post = getPost(decodeURI(slug))
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
  let ref: HTMLElement

  // highlight code blocks with highlight.js
  onMount(() => {
    if (ref != void 0) {
      ref.querySelectorAll("pre code").forEach(el => {
        if (el instanceof HTMLElement) hljs.highlightElement(el);
      })
    }
  })

  return (
    <article ref={(el) => ref = el} class="flex gap-3 flex-col"
      innerHTML={marked.parse(props.children ?? "")} />
  )
}