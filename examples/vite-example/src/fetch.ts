import init from "@dweb-browser/zstd-wasm";
import zstd_wasm_url from "@dweb-browser/zstd-wasm/zstd_wasm_bg.wasm?url";

import { test } from "./test.ts";
init(zstd_wasm_url).then(() => {
  test("fetch test");
});
