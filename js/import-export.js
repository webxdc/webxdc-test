function sendToChat(blob, text) {
    var data = {};
    if (blob) {
        data.file = new File(["BEGIN:VCALENDAR\n"], "event.ics", {
		    type: "text/calendar",
	    });
        if (text) {
            data.text = "Calendar events!";
        }
    } else if (text) {
        data.text = "Text without attachment!";
    }

    window.webxdc.sendToChat(data);
}

window.addEventListener("load", () => {
    let container = h("div", {class: "container"});
    let ul = h("ul");
    ul.append(
        h("li", {}, h("button", {onclick: "sendToChat(true, true);"}, "Share To Chat (file + text)")),
        h("li", {}, h("button", {onclick: "sendToChat(true, false);"}, "Share To Chat (file only)")),
        h("li", {}, h("button", {onclick: "sendToChat(false, true);"}, "Share To Chat (text only)")),
        h("li", {}, h("button", {onclick: "sendToChat(false, false);"}, "Share To Chat (error: no file, no text)")),
    );
    container.append(ul);
    document.getElementById("import-export-output").append(createHeader("webxdc.sendToChat()"), container);
});
