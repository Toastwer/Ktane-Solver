const href = window.location.href.split("/");
if(href[href.length - 2] === "pages")
    window.location.replace("/index.html#" + href[href.length - 1].split(".")[0]);