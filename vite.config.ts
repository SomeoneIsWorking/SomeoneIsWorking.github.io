import { sites } from "@openai/sites-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";

const githubPagesFallback = (): Plugin => ({
  name: "github-pages-spa-fallback",
  enforce: "post",
  generateBundle(_options, bundle) {
    const index = bundle["index.html"];
    if (index?.type === "asset") {
      this.emitFile({
        type: "asset",
        fileName: "404.html",
        name: "404.html",
        source: index.source,
      });
    }
  },
});

export default defineConfig({
  plugins: [vue(), sites(), githubPagesFallback()],
  server:
    process.env.CODEX_SANDBOX === "seatbelt"
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
});
