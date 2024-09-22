const test = require("node:test");
const assert = require("node:assert");
const { compress, decompress } = require("@dweb-browser/zstd-wasm");

test("compress && decompress", (t) => {
  const source = new Uint8Array(100);
  const output = compress(source, 10);
  const input = decompress(output);
  assert.ok(source.byteLength > output.byteLength);
  assert.deepEqual(source, input);
});
