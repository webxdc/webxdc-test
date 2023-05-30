function setInpPrev(event) {
    var img = document.getElementById('inpImgPreview');
    if (event.target.files.length == 0) {
        img.src = "#";
    } else {
        var reader = new FileReader();
        reader.onload = function() {
            img.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}

window.addEventListener("load", () => {
    document.getElementById("uploads-output").append(
        createHeader("Uploads/Import"),
        h("div", {class: "container"},
          h('input', {id: "imgInp", type: "file", accept: "image/*", onchange: "setInpPrev(event)"}),
          h("br"), h("br"),
          h("img", {id: "inpImgPreview", style: "max-height: 200px; max-width: 90%; width: auto; display:block", alt: "Image preview will appear here"}),
         ),
    );
});
