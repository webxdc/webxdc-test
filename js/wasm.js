window.addEventListener("load", async () => {
  let container = h("div", { class: "container" });
  const supported = await (async () => {
    // thanks to https://stackoverflow.com/a/47880734 for this check
    try {
      if (
        typeof WebAssembly === "object" &&
        typeof WebAssembly.instantiate === "function"
      ) {
        const module = new WebAssembly.Module(
          Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
        );
        if (!(module instanceof WebAssembly.Module)) {
          return false;
        }
        if (!(new WebAssembly.Instance(module) instanceof WebAssembly.Instance)) {
          return false;
        }

        let wasmFileWorks = false;
        // Example from https://developer.mozilla.org/en-US/docs/WebAssembly/Using_the_JavaScript_API
        const importObject = {
          imports: {
            imported_func: (arg) => {
              wasmFileWorks = arg === 42;
            },
          },
        };
        const obj = await WebAssembly.instantiateStreaming(
          fetch("/js/call-with-42.wasm"),
          importObject
        );
        obj.instance.exports.exported_func();
        if (!wasmFileWorks) {
          return false;
        }

        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  })();

  let result = h("div", {
    class: "wasm-support-dot",
    style: `background-color:${supported ? "green" : "grey"}`,
  });

  container.append(result);
  container.append(
    supported ? "WebAssembly is supported" : "WebAssembly is not supported"
  );
  document
    .getElementById("wasm-output")
    .append(createHeader("Wasm Support"), container);
});
