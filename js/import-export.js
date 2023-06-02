function sendToChat(file, text) {
    document.getElementById("promise-state").innerText = "Waiting for promise ...";
    var data = {};
    if (file) {
        data.file = {
            name: "example.txt",
        }
        if (file === 1) {
            data.file.base64 = btoa("hello world!"); // warning: btoa shouldn't be used with non-binary strings, used here for simplicity.
        } else if (file === 2) {
            data.file.blob = new Blob(["hello world!"]);
        } else if (file === 3) {
            data.file.plainText = "hello world!";
        }
        if (text) {
            data.text = "Text and attachment!";
        }
    } else if (text) {
        data.text = "Text without attachment!";
    }

    window.webxdc.sendToChat(data).then(() => {
        document.getElementById("promise-state").innerText = "Promise resolved.";
    }, (error) => {
        document.getElementById("promise-state").innerText = "Promise rejected: " + error;
    });
}

window.addEventListener("load", () => {
    let container = h("div", {class: "container"});
    let ul = h("ul", {style: "list-style-type: none;"});
    ul.append(
        h("li", {}, h("button", {onclick: "sendToChat(1, true);"}, "Send To Chat (base64, file+text)")),
        h("li", {}, h("button", {onclick: "sendToChat(2, true);"}, "Send To Chat (blob, file+text)")),
        h("li", {}, h("button", {onclick: "sendToChat(3, true);"}, "Send To Chat (plainText, file+text)")),

        h("li", {}, h("button", {onclick: "sendToChat(1, false);"}, "Send To Chat (file only)")),
        h("li", {}, h("button", {onclick: "sendToChat(0, true);"}, "Send To Chat (text only)")),
        h("li", {}, h("button", {onclick: "sendToChat(0, false);"}, "Send To Chat (error: no file, no text)")),
        h("li", {}, h("button", {onclick: "sendToChat(4, false);"}, "Send To Chat (error: invalid file)")),
    );
    container.append(ul);
    container.append(h("div", {id: "promise-state"}, ""));
    document.getElementById("import-export-output").append(createHeader("webxdc.sendToChat()"), container);
});
