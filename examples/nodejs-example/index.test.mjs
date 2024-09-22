import test from "node:test";
import assert from "node:assert";

import fs from "node:fs";
import url from "node:url";
import { compress, decompress, initSync } from "@dweb-browser/zstd-wasm";
const zstd_wasm_binary = fs.readFileSync(
  url.fileURLToPath(
    import.meta.resolve("@dweb-browser/zstd-wasm/zstd_wasm_bg.wasm")
  )
);

initSync({ module: zstd_wasm_binary });

test("compress && decompress", (t) => {
  const source = new Uint8Array(100);
  const output = compress(source, 10);
  const input = decompress(output);
  assert.ok(source.byteLength > output.byteLength);
  assert.deepEqual(source, input);
});
