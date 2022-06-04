window.addEventListener("load", () => {
    let container = h("div", {class: "container"});
    let events = ["unload", "beforeunload", "visibilitychange", "pagehide"];
    let getInt = (key) => parseInt(window.localStorage.getItem(key) || 0);
    events.forEach(key => {
        container.append(
            h("strong", {}, key), " triggered ", h("strong", {id: key + "-counter"}, getInt(`docEvent.${key}`)), " times",
            h("br"),
        );
        window.addEventListener(key, () => {
            let storageKey = `docEvent.${key}`;
            let count = getInt(storageKey) + 1;
            window.localStorage.setItem(storageKey, count);
            document.getElementById(key + "-counter").innerHTML = count;
        });
    });

    document.getElementById("unload-output").append(createHeader("Document Events"), container);
});
