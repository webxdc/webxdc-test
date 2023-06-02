window.addEventListener("load", () => {
  let container = h("div", { class: "container" });
  const supported = (() => {
    // thanks to https://stackoverflow.com/a/47880734 for this check
    try {
      if (
        typeof WebAssembly === "object" &&
        typeof WebAssembly.instantiate === "function"
      ) {
        const module = new WebAssembly.Module(
          Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
        );
        if (module instanceof WebAssembly.Module)
          return (
            new WebAssembly.Instance(module) instanceof WebAssembly.Instance
          );
      }
    } catch (e) {}
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
