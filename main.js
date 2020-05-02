const log = "( ͡° ͜ʖ ͡°)";

let page = "";

$(() => {
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

	loadPage("home");
});

function loadPage(name) {
	page = name;
	$.get("/pages/" + name + ".html", (data) => {
		$("#content").html(data);
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