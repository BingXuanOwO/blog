import fs from "fs";
import { Root, Yaml } from "mdast";

import path from "path";
import yaml from "yaml";
import { fromMarkdown } from "mdast-util-from-markdown";
import { frontmatterFromMarkdown } from "mdast-util-frontmatter";
import { frontmatter } from "micromark-extension-frontmatter";
import { gfmStrikethroughFromMarkdown } from "mdast-util-gfm-strikethrough";
import { gfmStrikethrough } from "micromark-extension-gfm-strikethrough";
import { removePosition } from "unist-util-remove-position";

import { toString } from "mdast-util-to-string";

export function convertPostListItem(root: Root): postInfo | undefined {
  const frontMatterNode = root.children.find(
    (element) => element.type === "yaml"
  ) as Yaml | undefined;

  if (frontMatterNode !== void 0) {
    const parsedFrontMatter = yaml.parse(frontMatterNode.value);

    // i'm still no idea how to get preview for every post
    const preview =
      toString({
        type: "root",
        children: root.children.filter(
          (element) => element.type !== "image" && element.type !== "yaml"
        ),
      })
        .split("\n")
        .find((str) => str != "") ?? "";

    return {
      title: parsedFrontMatter.title,
      date: new Date(parsedFrontMatter.date).getTime(),
      category: parsedFrontMatter.category,
      preview:
        (preview[preview.length - 1] === "." ? preview.slice(0, -1) : preview) +
        "...",
    };
  }

  return void 0;
}

export default async function buildPosts(
  outputDir: string,
  postsStoragePath: string
) {
  const postList: postInfo[] = [];

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  if (!fs.existsSync(path.join(outputDir, "posts"))) {
    fs.mkdirSync(path.join(outputDir, "posts"));
  }

  // parse files in dir
  fs.readdirSync(postsStoragePath).map((slug) => {
    const doc = fs.readFileSync(path.join(postsStoragePath, slug));

    const nodeTree = fromMarkdown(doc, {
      mdastExtensions: [
        frontmatterFromMarkdown(["yaml"]),
        gfmStrikethroughFromMarkdown(),
      ],
      extensions: [frontmatter(["yaml"]), gfmStrikethrough()],
    });

    removePosition(nodeTree, { force: true });

    const generatedFilePath = path.join(
      path.join(outputDir, "posts"),
      slug.slice(0, slug.lastIndexOf(".")) + ".json"
    );

    const postInfo: postInfo | undefined = convertPostListItem(nodeTree);

    if (postInfo !== void 0) {
      // write converted file to json
      fs.writeFileSync(
        generatedFilePath,
        JSON.stringify({ info: postInfo, content: nodeTree })
      );

      postList.push({
        ...postInfo,
        slug: slug.slice(0, slug.lastIndexOf(".")),
      });
    }
  });

  // sort post list and write to file
  postList.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  fs.writeFileSync(
    path.join(outputDir, "posts.json"),
    JSON.stringify(postList)
  );

  return;
}
