function reloadWidth() {
    document.getElementById("races-width").innerHTML = "window.innerWidth = " + window.innerWidth;
}

window.addEventListener("load", () => {
    var output = document.getElementById("races-output");
    output.innerHTML = "<h1>innerWidth</h1>";
    output.innerHTML += '<span id="races-width"><strong>On Load:</strong> window.innerWidth = ' + window.innerWidth + "</span>";
    output.innerHTML += ' <button onclick="reloadWidth()">Refresh</button>'
    output.innerHTML += "<hr>";
});

window.addEventListener("resize", () => {
    console.log("[innerWidth] window size changed: window.innerWidth = " + window.innerWidth);
});
