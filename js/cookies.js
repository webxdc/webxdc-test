function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) 
    {
	var c = ca[i].trim();
	if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

window.addEventListener("load", () => {
    setCookie("cookieJar", parseInt(getCookie("cookieJar") || 0) + 1, 999);
    let count = parseInt(getCookie("cookieJar") || 0);

    let container = h("div", {class: "container"});
    if (count === 0) {
        container.append(h("strong", {class: "red"}, "WARNING: "), "cookies are not supported.");
    } else {
        container.append(
            "Times you opened this app: ", h("span", {id: "cookies-counter"}, count)
        );
    }

    document.getElementById("cookies-output").append(createHeader("Cookies"), container);
});

window.addEventListener("resize", () => {
    console.log("[innerWidth] window size changed: window.innerWidth = " + window.innerWidth);
});
