import { PluginOption } from "vite";
import buildPosts from "../data/build_posts";

export default function ViteGeneratePostsPlugin(options = {}): PluginOption {
  return {
    name: "GeneratePosts", 
    buildStart: async (source) => {
      console.log("build")
      await buildPosts(".generated", "posts");
      console.info('Posts build complete.')
    },
  };
}
