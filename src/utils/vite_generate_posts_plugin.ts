import { PluginOption } from "vite";
import buildPosts from "../data/build_posts";

export default function ViteGeneratePostsPlugin(options = {}): PluginOption {
  return {
    name: "GeneratePosts", 
    buildStart: {
      order: "pre",
      async handler(source) {
        await buildPosts("generated", "posts");
        this.info('Posts build complete.')
      }
    }
  };
}
