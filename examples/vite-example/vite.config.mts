import { defineConfig } from "vite";
// import wasmPack from "vite-plugin-wasm-pack";

export default defineConfig({
  //   plugins: [wasmPack([], ["@dweb-browser/zstd-wasm"])],
  //...

  build: {
    rollupOptions: {
      input: {
        fetch: "./fetch.html",
        bundle: "./bundle.html",
      },
    },
  },
});
