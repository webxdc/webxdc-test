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

    let btn1 = h("button", {}, "notify (via info message) with deep-link to internal page");
    btn1.onclick = () => {
        window.webxdc.sendUpdate({ payload: "",  info: "click me to open ./page.html directly", href: "./page.html", notify:["all", window.webxdc.selfAddr]}, "");
    };
    ul.append(h("li", {}, btn1));

    let btn2 = h("button", {}, "notify (via summary) with deep-link to internal page");
    btn2.onclick = () => {
        window.webxdc.sendUpdate({ payload: "",  info: "click me to open ./page.html directly", href: "./page.html", notify:["all", window.webxdc.selfAddr]}, "");
    };
    ul.append(h("li", {}, btn2));

    let btn3 = h("button", {}, "send info message with deep-link to #links-output section");
    btn3.onclick = () => {
        window.webxdc.sendUpdate({ payload: "",  info: "click me to open #links-output directly", href: "#links-output"}, "");
    };
    ul.append(h("li", {}, btn3));

    const ifrmExplain = h("p", {}, "If this app was sent in the Saved Messages chat, due to request_internet_access set in manifest, the next iframe should load https://delta.chat from Internet:");
    const ifrm = h("iframe", {src: "https://delta.chat"});
    ifrm.style.width = "100%";
    ifrm.style.height = "auto";

    document.getElementById("links-output").append(
        createHeader("Links"), h("div", {class: "container"}, ul, ifrmExplain, ifrm)
    );
});
