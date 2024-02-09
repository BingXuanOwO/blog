import hljs from "highlight.js";
import "~/highLight.css";
import { ErrorBoundary, JSX, onMount } from "solid-js";
import { getPost } from "~/data/post";
import { HeadingTitle } from "~/components/HeadingTitle";
import { ReturnByError } from "~/components/ReturnByError";
import dayjs from "dayjs";
import { Nodes, Root } from "mdast";
import { Dynamic } from "solid-js/web";
import { createAsync, useParams } from "@solidjs/router";

const fetchPost =async (slug: string) => {
  "use server";
  try {
    const post = await getPost(decodeURI(slug));
    return {
      info: post.info,
      content: post.content,
      found: true,
    };
  } catch (err) {
    if (err instanceof Error && err.message == "Not Found") {
      return { found: false };
    }

    console.log(err);
    return { found: false, internalError: true };
  }
}

export default function Post() {
  const params = useParams()
  const post = createAsync(async()=>await fetchPost(params.slug));
  console.log(post()?.info?.date);

  let ref: HTMLElement;

  // highlight code blocks with highlight.js
  onMount(() => {
    if (ref != void 0) {
      ref.querySelectorAll("pre code").forEach((el) => {
        if (el instanceof HTMLElement) hljs.highlightElement(el);
      });
    }
  });

  return (
    <>
      <meta name="description" content={post()?.info?.preview}></meta>
      <main class="gap-6 flex flex-col">
          <article ref={(el) => (ref = el)} class="flex gap-3 flex-col">
            <HeadingTitle title={post()?.info?.title} />
            <div class="opacity-60 text-ellipsis overflow-hidden gap-4 flex">
              <span>
                {dayjs(post()?.info?.date).format("YYYY-MM-DD HH:mm")}
              </span>
              <span>{post()?.info?.category}</span>
            </div>
            {renderMarkdownParagraph(post()?.content)}
          </article>
      </main>
      </>
  );
}

function renderMarkdownParagraph(node: Nodes | undefined): JSX.Element {
  if (node === void 0) return;

  const renderChildren = () => {
    if ("children" in node) {
      return node.children.map((element) => renderMarkdownParagraph(element));
    }
  };

  switch (node.type) {
    case "root":
      return <>{renderChildren()}</>;

    case "yaml":
      return;

    case "heading":
      return <Dynamic component={"h" + node.depth}>{renderChildren}</Dynamic>;

    case "emphasis":
      return <span class="italic">{renderChildren()}</span>;

    case "text":
      return <>{node.value}</>;

    case "link":
      return (
        <a href={node.url} class="text-main" title={node.title ?? void 0}>
          {renderChildren()}
        </a>
      );

    case "delete":
      return <span class="line-through">{renderChildren()}</span>;

    case "strong":
      return <span class="font-bold">{renderChildren()}</span>;

    case "paragraph":
      return <p>{renderChildren()}</p>;

    case "thematicBreak":
      return <hr />;

    case "inlineCode":
      return <code>{node.value}</code>;

    case "code":
      return (
        <pre>
          <code>{node.value}</code>
        </pre>
      );

    case "blockquote":
      return <blockquote>{renderChildren()}</blockquote>;

    case "image":
      return (
        <img
          src={node.url}
          title={node.title ?? void 0}
          alt={node.alt ?? void 0}
          class="m-auto"
        />
      );

    case "list":
      return (
        <Dynamic component={node.ordered ? "ol" : "ul"}>
          {renderChildren()}
        </Dynamic>
      );

    case "listItem":
      return <li class="flex flex-row [&_p]:list-item">{renderChildren()}</li>;

    case "html":
      return <div innerHTML={node.value}></div>;

    default:
      // console.log(node);
      return;
  }
}
