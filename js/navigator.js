function refreshNavigatorLanguage() {
    document.getElementById("navigator-language").innerHTML = window.navigator.language;
}

window.addEventListener("load", () => {
    document.getElementById("navigator-output").append(
        createHeader("Navigator"),
        h("div", {class: "container"},
          h("strong", {}, "User Agent: "), window.navigator.userAgent,
          h("br"),
          h("strong", {}, "Language: "),
          h("span", {id: "navigator-language"}, window.navigator.language), " ",
          h("button", {onclick: "refreshNavigatorLanguage();"}, "Refresh"),
          h("br"),
          "Vibration test: ", h("button", {onclick: "window.navigator.vibrate(500);"}, "Vibrate")
         )
    );
});

window.addEventListener("resize", () => {
    console.log("[innerWidth] window size changed: window.innerWidth = " + window.innerWidth);
});
