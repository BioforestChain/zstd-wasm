import fs from "node:fs";
import url from "node:url";
import { $ } from "./$.ts";

const resolve = (path: string) => url.fileURLToPath(import.meta.resolve(path));
const package_json_filepath = resolve("../pkg/package.json");
const version =
  Deno.args[0] ??
  (() => {
    try {
      return JSON.parse(fs.readFileSync(package_json_filepath, "utf-8"))
        .version;
    } catch {
      return "0.1.0";
    }
  })();

await $("wasm-pack", "build ./ --target web --dev --scope dweb-browser");
fs.renameSync(resolve("../pkg/zstd_wasm.js"), resolve("../pkg/zstd_wasm.mjs"));
await $("wasm-pack", "build ./ --target nodejs --release --scope dweb-browser");

const packageJson = JSON.parse(fs.readFileSync(package_json_filepath, "utf-8"));
const write_zstd_wasm_bg_wasm_file = (ZSTD_WASM_BG_WASM_BASE64: string) => {
  const zstd_wasm_bg_wasm_ts_filepath = resolve("../pkg/zstd_wasm_bg_wasm.ts");
  fs.writeFileSync(
    zstd_wasm_bg_wasm_ts_filepath,
    fs
      .readFileSync(resolve("./template/zstd_wasm_bg_wasm.ts"), "utf8")
      .replace("ZSTD_WASM_BG_WASM_BASE64", ZSTD_WASM_BG_WASM_BASE64)
  );
};
write_zstd_wasm_bg_wasm_file(
  fs.readFileSync(resolve("../pkg/zstd_wasm_bg.wasm"), "base64")
);

$.cd(resolve("../pkg"));
await $(
  "esbuild",
  "zstd_wasm_bg_wasm.ts --format=esm --outfile=zstd_wasm_bg_wasm.mjs"
);
await $(
  "esbuild",
  "zstd_wasm_bg_wasm.ts --format=cjs --outfile=zstd_wasm_bg_wasm.js"
);

write_zstd_wasm_bg_wasm_file("");

Object.assign(packageJson, {
  files: [
    "zstd_wasm.mjs",
    ...packageJson.files,
    "zstd_wasm_bg_wasm.mjs",
    "zstd_wasm_bg_wasm.js",
    "zstd_wasm_bg_wasm.ts",
  ].sort(),
  version: Deno.args[0] ?? version,
  exports: {
    ".": {
      types: "./zstd_wasm.d.ts",
      import: "./zstd_wasm.mjs",
      require: "./zstd_wasm.js",
    },
    "./zstd_wasm_bg.wasm": "./zstd_wasm_bg.wasm",
    "./zstd_wasm_bg_wasm": {
      types: "./zstd_wasm_bg_wasm.ts",
      import: "./zstd_wasm_bg_wasm.mjs",
      require: "./zstd_wasm_bg_wasm.js",
    },
  },
  repository: {
    type: "git",
    url: "git://github.com/BioforestChain/zstd-wasm.git",
  },
  bugs: {
    email: "gaubeebangeel@gmail.com",
    url: "https://github.com/BioforestChain/zstd-wasm/issues",
  },
  author: "Gaubee <gaubeebangeel@gmail.com>",
  license: "MIT",
  keywords: ["zstd", "wasm", "compression", "decompression"],
});

fs.writeFileSync(package_json_filepath, JSON.stringify(packageJson, null, 2));
