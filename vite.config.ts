import { sites } from "@openai/sites-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { defineConfig, type Plugin } from "vite";

const deploymentOutput = (): Plugin => ({
  name: "deployment-output",
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
    this.emitFile({
      type: "asset",
      fileName: "server/index.js",
      source: `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  },
};\n`,
    });
  },
});

export default defineConfig({
  plugins: [vue(), sites(), deploymentOutput()],
  server:
    process.env.CODEX_SANDBOX === "seatbelt"
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
});
