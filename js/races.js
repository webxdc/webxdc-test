function reloadWidth() {
    document.getElementById("races-width").innerHTML = ` window.innerWidth = ${window.innerWidth} `;
}

window.addEventListener("load", () => {
    document.getElementById("races-output").append(
        createHeader("innerWidth"),
        h("div", {class: "container"},
          h("span", {id: "races-width"},
            h("strong", {}, "On Load:"), ` window.innerWidth = ${window.innerWidth} `,
           ),
          h("button", {onclick: "reloadWidth()"}, "Refresh")
         )
    );
});

window.addEventListener("resize", () => {
    console.log("[innerWidth] window size changed: window.innerWidth = " + window.innerWidth);
});
