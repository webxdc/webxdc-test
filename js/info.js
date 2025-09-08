window.addEventListener("load", () => {
    let container = h("div", {class: "container"});

    // background is set to spot leading/trailing spaces errors
    container.append(h("div", {}, "webxdc.selfName: ", h("span", {style: "background:#DDD;word-wrap: break-word;"}, webxdc.selfName)))
    container.append(h("div", {}, "webxdc.selfAddr: ", h("span", {style: "background:#DDD;word-wrap: break-word;"}, webxdc.selfAddr)))

    container.append(h("div", {}, "webxdc.sendUpdateInterval: " + webxdc.sendUpdateInterval))
    container.append(h("div", {}, "webxdc.sendUpdateMaxSize: " + webxdc.sendUpdateMaxSize))

    document.getElementById("info-output").append(createHeader("Info"), container);
});

