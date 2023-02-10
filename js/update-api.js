window.addEventListener("load", () => {

    var updatesInitialized = false;
    var previousUpdates = 0;
    var currentUpdates = 0;

    document.getElementById("update-api-output").append(
        createHeader("Webxdc Updates"),
        h("div", {class: "container"},
          h("strong", {id: "updates-error", style: "color: red"}, "ERROR, current update missing: "),
          h("strong", {id: "updates-ok", style: "display: none"}, "OK: "),
          h("span", {}, "updates from previous/current runs: "),
          h("strong", {id: "previous-runs"}, "0"),
          h("span", {}, "/"),
          h("strong", {id: "current-run"}, "0"),
         )
    );

    window.webxdc.setUpdateListener(function (update) {
        if (!updatesInitialized) {
            previousUpdates++
        } else {
            currentUpdates++
            document.getElementById("updates-error").style.display = "none";
            document.getElementById("updates-ok").style.display = "inline";
        }
        document.getElementById("previous-runs").innerHTML = previousUpdates;
        document.getElementById("current-run").innerHTML = currentUpdates;
    }).then(() => {
        updatesInitialized = true
        window.webxdc.sendUpdate({payload: { "update-api-test": "bar"}}, "test update");
    })
});
