window.addEventListener("load", () => {
    let container = h("div", {class: "container"});
    let events = ["unload", "beforeunload", "visibilitychange", "pagehide"];
    let getInt = (key) => parseInt(window.localStorage.getItem(key) || 0);
    events.forEach(eventName => {
        container.append(
            h("strong", {}, eventName), " triggered ", h("strong", {id: eventName + "-counter"}, getInt(`docEvent.${eventName}`)), " times",
            h("br"),
        );
        window.addEventListener(eventName, () => {
            let storageKey = `docEvent.${eventName}`;
            let count = getInt(storageKey) + 1;
            window.localStorage.setItem(storageKey, count);
            document.getElementById(eventName + "-counter").innerHTML = count;
        });
    });

    document.getElementById("unload-output").append(createHeader("Document Events"), container);
});
