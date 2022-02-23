window.addEventListener("load", () => {
    var output = document.getElementById("uploads-output");
    output.innerHTML = "<h1>Uploads</h1>";
    
    var input = document.createElement('input');
    input.type = 'file';

    output.append(input);
    output.innerHTML += "<hr>";
});
