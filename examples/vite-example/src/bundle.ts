import { compress, decompress, initSync } from "@dweb-browser/zstd-wasm";
import get_zstd_wasm_binary from "@dweb-browser/zstd-wasm/zstd_wasm_bg_wasm";
initSync(get_zstd_wasm_binary());

import { test } from "./test.ts";
test("bundle test");
