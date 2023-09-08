function refreshNavigatorLanguage() {
    document.getElementById("navigator-language").innerHTML = window.navigator.language;
}

window.addEventListener("load", () => {
    document.getElementById("navigator-output").append(
        createHeader("Navigator"),
        h("div", {class: "container"},
          // `isSecureContext` is responsible for many Web APIs being available:
          // https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts/features_restricted_to_secure_contexts
          // Also see https://support.delta.chat/t/allow-access-to-camera-geolocation-other-web-apis/2446
          //
          // Yes, secure context is not inherent to Navigator, but most
          // features that require it belong to `navigator`, so...
          h("strong", {}, "isSecureContext: "),
          h("span", { class: isSecureContext ? "" : "red" }, isSecureContext),
          h("br"),

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
