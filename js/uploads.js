window.addEventListener("load", () => {
    document.getElementById("uploads-output").append(
        createHeader("Uploads"),
        h("div", {class: "container"}, h('input', {type: "file"}))
    );
});
