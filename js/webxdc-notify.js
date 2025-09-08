window.addEventListener("load", () => {
    let ul = h("ul");

    let btn1 = h("button", {}, "info with deep-link to internal page, no notify");
    btn1.onclick = () => {
        window.webxdc.sendUpdate({ payload: "", info: "open page.html", href: "page.html" }, "");
    };
    ul.append(h("li", {}, btn1));

    let btn2 = h("button", {}, "info and notify all with deep-link to internal page");
    btn2.onclick = () => {
        window.webxdc.sendUpdate({ payload: "", info: "open page.html", href: "page.html", notify: {"*": "notify page.html"} }, "");
    };
    ul.append(h("li", {}, btn2));

    let btn3 = h("button", {}, "info and notify all with deep-link to #links-output section");
    btn3.onclick = () => {
        window.webxdc.sendUpdate({ payload: "", info: "open #links-output", href: "index.html#links-output", notify: {"*": "notify #links-output"} }, "");
    };
    ul.append(h("li", {}, btn3));

    document.getElementById("webxdc-notify-output").append(
        createHeader("Webxdc Notify"), h("div", {class: "container"}, ul)
    );
});
