window.addEventListener("load", () => {
    let ul = h("ul");
    ul.append(
        h("li", {}, h("a", {href: "https://delta.chat"}, "Normal link: https://delta.chat (should work if sent in Saved Messages chat due to request_internet_access property set in manifest)")),
        h("li", {}, h("a", {href: "mailto:delta@example.org?body=test+message"}, "Mailto link")),
        h("li", {}, h("a", {href: "OPENPGP4FPR:571E6FDC22C1605512A1B0C8F7AC9331B82AFB5B#a=delta%40example.org&n=TestContact&i=pHMb3fRw-JV&s=VcWU-pQSEeB"}, "QR verification link")),
        h("li", {}, h("a", {href: "cabal://cabal.chat"}, "Custom scheme link")),
        h("li", {}, h("a", {href: "./page.html"}, "Link to an internal HTML page")),
        h("li", {}, h("a", {href: "chrome://crash"}, "chrome://crash")),
    );
    const ifrmExplain = h("p", {}, "If this app was sent in the Saved Messages chat, due to request_internet_access set in manifest, the next iframe should load https://delta.chat from Internet:");
    const ifrm = h("iframe", {src: "https://delta.chat"});
    ifrm.style.width = "100%";
    ifrm.style.height = "auto";

    document.getElementById("links-output").append(
        createHeader("Links"), h("div", {class: "container"}, ul, ifrmExplain, ifrm)
    );
});
