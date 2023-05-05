function sendMessage() {
    const blob = new Blob(["BEGIN:VCALENDAR\n"]);
    window.webxdc.sendMessage({blob: blob, fileName: "test.ics", text: "jippee!"});
}

window.addEventListener("load", () => {
    let container = h("div", {class: "container"});

    container.append(
        h("button", {onclick: "sendMessage();"}, "Send Message"),
    );

    document.getElementById("send-message-output").append(createHeader("webxdc.sendMessage()"), container);
});
