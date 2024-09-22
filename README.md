# zstd-wasm

build with [zstd-rs](https://github.com/gyscos/zstd-rs)

## how to use within vite

1. fetch wasm file

   > Vite will automatically pack the wasm file into the `dist/assets` folder. On the website, it will download this wasm file using network.

   ```ts
   import init, { compress, decompress } from "@dweb-browser/zstd-wasm";
   import zstd_wasm_url from "@dweb-browser/zstd-wasm/zstd_wasm_bg.wasm?url";
   // Modern browsers can directly use `await init(zstd_wasm_url);`
   init(zstd_wasm_url).then(() => {
     /// compress or decompress
     const output = compress(new Uint8Array(100), 10);
     const input = decompress(output);
     console.log(input, output);
   });
   ```

1. bundle wasm into js with base64 encoding

   ```ts
   import { compress, decompress, initSync } from "@dweb-browser/zstd-wasm";
   import get_zstd_wasm_binary from "@dweb-browser/zstd-wasm/zstd_wasm_bg_wasm";
   initSync(get_zstd_wasm_binary());

   /// compress or decompress
   ```

## how to use in nodejs

1. commonjs

   ```ts
   const { compress, decompress } = require("@dweb-browser/zstd-wasm");

   /// compress or decompress
   ```

1. esmodule

   ```ts
   import fs from "node:fs";
   import url from "node:url";
   import { compress, decompress, initSync } from "@dweb-browser/zstd-wasm";
   const zstd_wasm_binary = fs.readFileSync(
     url.fileURLToPath(
       import.meta.resolve("@dweb-browser/zstd-wasm/zstd_wasm_bg.wasm")
     )
   );

   initSync({ module: zstd_wasm_binary });

   /// compress or decompress
   ```

## how to use in deno

```ts
import { compress, decompress, initSync } from "@dweb-browser/zstd-wasm";
import zstd_wasm_binary from "@dweb-browser/zstd-wasm/zstd_wasm_bg_wasm";
initSync(get_zstd_wasm_binary());

/// compress or decompress
const output = compress(new Uint8Array(100), 10);
const input = decompress(output);
console.log(input, output);
```

## how to build

1. read https://github.com/gyscos/zstd-rs/wiki/Compile-for-WASM
1. install [wasm-bindgen]() `cargo install wasm-bindgen-cli`
   > checkout `wasm-bindgen -V` shoule equals the value in [cargo.toml](./cargo.toml)
1. install [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
1. install [esbuild](https://esbuild.github.io/getting-started/#install-esbuild) `npm install -g esbuild`
1. install [deno](https://deno.com/)
   ```
   curl -fsSL https://deno.land/install.sh | sh # macos or linux
   irm https://deno.land/install.ps1 | iex # windows
   ```
1. run script: `deno task build`
   > output to [pkg](./pkg) folder
