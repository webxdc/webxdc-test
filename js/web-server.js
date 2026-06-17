const fetches = [
  "/index.html",
  "/webxdc.js",
  "/",
  "./nested/../nested/percent encodable.txt",
  "/nonexistent.lol",
  "https://delta.chat",
].map((url) => [url, fetch(url)]);

window.addEventListener("load", async () => {
  document
    .getElementById("web-server-output")
    .append(
      createHeader("Web Server"),
      h(
        "div",
        { class: "container" },
        h("p", {}, "Current URL: ", h("code", {}, location.href)),
        h(
          "table",
          {},
          h(
            "tbody",
            {},
            ...(await Promise.all(
              fetches.map(async ([url, fetchPromise]) =>
                h(
                  "tr",
                  { border: "1px solid gray" },
                  h(
                    "td",
                    { style: "padding: 0.125rem 0.5rem;" },
                    h("code", {}, url)
                  ),
                  h("td", {}, await formatFetch(fetchPromise))
                )
              )
            ))
          )
        )
      )
    );
});

/**
 * @param {ReturnType<typeof fetch>} promise
 * @returns {Promise<string>}
 */
async function formatFetch(promise) {
  let r;
  try {
    r = await promise;
  } catch (err) {
    return err.message;
  }
  return `${r.status} ${r.statusText}; type: ${r.type}`;
}
