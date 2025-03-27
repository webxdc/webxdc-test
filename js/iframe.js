window.addEventListener("load", () => {
  const ifrmExplain = h(
    "p",
    {},
    "iframe: should be blocked and not load https://delta.chat from Internet:"
  );
  const ifrm = h("iframe", { src: "https://delta.chat" });
  ifrm.style.width = "100%";
  ifrm.style.height = "auto";

  document
    .getElementById("iframe-output")
    .append(
      createHeader("Loading website in iframe"),
      h("div", { class: "container" }, ifrmExplain, ifrm)
    );
});
