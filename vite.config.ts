import solid from "solid-start/vite";
import { defineConfig } from "vite";
import ViteGeneratePostsPlugin from "./src/utils/vite_generate_posts_plugin";

export default defineConfig({
  plugins: [solid(), ViteGeneratePostsPlugin()],
});
