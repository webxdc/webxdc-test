function h(tag, attributes, ...children) {
    const element = document.createElement(tag);
    if (attributes) {
        Object.entries(attributes).forEach(entry => {
            element.setAttribute(entry[0], entry[1]);
        });
    }
    element.append(...children);
    return element;
}

function createHeader(text) {
    return h("header", {class: "container"}, h("h2", {}, text));
}
