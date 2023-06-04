function setInpPrev(files) {
    var img = document.getElementById('inpImgPreview');
    if (files.length == 0) {
        img.src = "#";
    } else {
        var reader = new FileReader();
        reader.onload = function() {
            img.src = reader.result;
        };
        reader.readAsDataURL(files[0]);
    }
}
function importFiles() {
    webxdc.importFiles({mimeTypes: ['image/*']}).then((files) => {
        setInpPrev(files);
    });
}

window.addEventListener("load", () => {
    document.getElementById("uploads-output").append(
        createHeader("Uploads/Import"),
        h("div", {class: "container"},
          h("button", {onclick: "importFiles()"}, "webxdc.importFiles(...)"),
          " or ",
          h('input', {id: "imgInp", type: "file", accept: "image/*", onchange: "setInpPrev(event.target.files)"}),
          h("br"), h("br"),
          h("img", {id: "inpImgPreview", style: "max-height: 200px; max-width: 90%; width: auto; display:block", alt: "Image preview will appear here"}),
         ),
    );
});
