const log = "( ͡° ͜ʖ ͡°)";

$(() => {
	$("body").on('mouseenter', ".navbar", (e) => {
		$("#overlay").css("background-color", "rgba(0, 0, 0, 0.5)");
	});

	$("body").on('mouseleave', ".navbar", (e) => {
		$("#overlay").css("background-color", "rgba(0, 0, 0, 0)");
	});
});