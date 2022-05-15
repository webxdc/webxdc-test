
window.addEventListener("load", () => {
    var storage = window.localStorage;
    var count = parseInt(storage.getItem("onunload-test") || 0);

    var output = document.getElementById("unload-output");
    output.innerHTML = "<h1>unload</h1>";
    output.innerHTML += "unload event called " + count + " times";
    output.innerHTML += "<hr>";
});

window.addEventListener("unload", () => {
    var storage = window.localStorage;
    var count = parseInt(storage.getItem("onunload-test") || 0) + 1;
    storage.setItem("onunload-test", count);
});