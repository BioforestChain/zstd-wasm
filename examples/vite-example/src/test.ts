import { compress, decompress } from "@dweb-browser/zstd-wasm";
export const test = (title: string) => {
  const source = new Uint8Array(100);
  const output = compress(source, 10);
  const input = decompress(output);

  const result = document.createElement("main");
  const head = document.createElement("h2");
  head.textContent = title;
  result.append(head);
  if (source.byteLength > output.byteLength) {
    result.innerHTML += "<h6 style='color:green'>compress ✅</h6>";
  } else {
    result.innerHTML += "<h6 style='color:red'>compress ❌</h6>";
  }
  if (indexedDB.cmp(source, input) === 0) {
    result.innerHTML += "<h6 style='color:green'>decompress ✅</h6>";
  } else {
    result.innerHTML += "<h6 style='color:red'>decompress ❌</h6>";
  }
  document.body.append(result);
};
