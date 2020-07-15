const log = "( ͡° ͜ʖ ͡°)";

let page = "";

let indicators = new Object();
let ports = new Object(); 
let serial = new Object();
let batteries = 0;

let loadedFiles = [];

$(() => {
	if($(location).attr('href').includes("#")) {
		loadPage($(location).attr('href').split("#")[1]);
	} else {
		loadPage("home");
	}

	$("body").on('mouseenter', ".navbar", (e) => {
		$("#overlay").css("background-color", "rgba(0, 0, 0, 0.5)");
	});

	$("body").on('mouseleave', ".navbar", (e) => {
		$("#overlay").css("background-color", "rgba(0, 0, 0, 0)");
	});

	$(".navbar").on('click', "a", (e) => {
		const classes = $(e.target).parent()[0].classList;
		loadPage(classes[classes.length - 1].split("navbar-item-")[1]);
	});
});

function loadPage(name) {
	page = name;
	$.get("/pages/" + name + ".html", (data) => {
		if(loadedFiles.includes(page))
			data = data.split("<!-- scripts -->")[0];
		else
			loadedFiles.push(page);
		
		$("#content").html(data);
		
		if(typeof reloadPage === "function")
			reloadPage();
	}).fail((data) => {
		console.log(data);
		if (data.status == 404)
			$("#content").html(`<h2>Error 404: Page not found. Please try again later</h2><h4>${data.responseText}</h4>`);
		else if (data.status == 403)
			$("#content").html(`<h2>Error 403: Forbidden. Please try again later</h2><h4>${data.responseText}</h4>`);
		else
			$("#content").html(`<h2>An unexpected error occurred. Please try again later</h2><h4>${data.status + ": " + data.responseText}</h4>`);
	});
}