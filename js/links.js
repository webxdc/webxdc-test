window.addEventListener("load", () => {
    let ul = h("ul");
    ul.append(
        h("li", {}, h("a", {target:"_blank", href: "https://delta.chat"}, "Normal link: https://delta.chat (should ask to open externally)")),
        h("li", {}, h("a", {href: "mailto:delta@example.org?body=test+message"}, "Mailto link")),
        h("li", {}, h("a", {href: "OPENPGP4FPR:571E6FDC22C1605512A1B0C8F7AC9331B82AFB5B#a=delta%40example.org&n=TestContact&i=pHMb3fRw-JV&s=VcWU-pQSEeB"}, "old openpgp4fpr: QR verification link")),
        h("li", {}, h("a", {target:"_blank", href: "https://i.delta.chat/#9AF055DB87EC48A1C009B6CA55E3712A6F7D346F&a=botsindex%40nine.testrun.org&n=Public%20Bots&i=QpBSronexvP&s=nAfQ0q_JomN"}, "New i.delta.chat invite link")),
        h("li", {}, h("a", {href: "geo:48.844,2.395"}, "geo-url link (geo:)")),
        h("li", {}, h("a", {href: "cabal://cabal.chat"}, "Custom scheme link")),
        h("li", {}, h("a", {href: "./page.html"}, "Link to an internal HTML page")),
        h("li", {}, h("a", {href: "chrome://crash"}, "chrome://crash")),
    );

    document.getElementById("links-output").append(
        createHeader("Links"), h("div", {class: "container"}, ul)
    );
});
