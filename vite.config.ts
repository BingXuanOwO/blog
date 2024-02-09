import { defineConfig } from "@solidjs/start/config";
import ViteGeneratePostsPlugin from "./src/utils/vite_generate_posts_plugin";
import { env } from "process";

export default defineConfig({
  plugins: [ViteGeneratePostsPlugin()],
  start: {
    server: {
      preset: env["PRESET"],
      prerender: {
        routes: ["/"],
        
      }
    }
  }
});
