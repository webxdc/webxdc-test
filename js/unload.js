
window.addEventListener("load", () => {
    var storage = window.localStorage;
    var onunloadCount = parseInt(storage.getItem("onunload-test") || 0);
    var onbeforeunloadCount = parseInt(storage.getItem("onbeforeunload-test") || 0);
    var onvisibilitychangeCount =  parseInt(storage.getItem("onvisibilitychange-test") || 0);
    var onpagehideCount =  parseInt(storage.getItem("onpagehide-test") || 0);

    var output = document.getElementById("unload-output");
    output.innerHTML = "<h1>unload</h1>";
    output.innerHTML += "unload event triggered " + onunloadCount + " times<br>";
    output.innerHTML += "beforeunload event triggered " + onbeforeunloadCount + " times<br>";
    output.innerHTML += "visibilitychange event triggered " + onvisibilitychangeCount + " times<br>";
    output.innerHTML += "onpagehide event triggered " + onpagehideCount + " times";
    output.innerHTML += "<hr>";
});

window.addEventListener("beforeunload", () => {
    var storage = window.localStorage;
    var count = parseInt(storage.getItem("onbeforeunload-test") || 0) + 1;
    storage.setItem("onbeforeunload-test", count);
});

window.addEventListener("unload", () => {
    var storage = window.localStorage;
    var count = parseInt(storage.getItem("onunload-test") || 0) + 1;
    storage.setItem("onunload-test", count);
});

window.addEventListener("visibilitychange", () => {
    var storage = window.localStorage;
    var count = parseInt(storage.getItem("onvisibilitychange-test") || 0) + 1;
    storage.setItem("onvisibilitychange-test", count);
});

window.addEventListener("pagehide", () => {
    var storage = window.localStorage;
    var count = parseInt(storage.getItem("onpagehide-test") || 0) + 1;
    storage.setItem("onpagehide-test", count);
});