let interval;
$(() => {
    interval = setInterval(checkIfDataExists, 30);
});

function checkIfDataExists() {
    if(activeModules.size > 0) {
        clearInterval(interval);
        fetchActiveStates();
    }
}

function fetchActiveStates() {
    activeModules.forEach(val => {
        $("#" + val).addClass("active");
    });

    updateNavBar();
}

$("body").on("click", ".icons .icon", function() {
    if($(this).hasClass("active")) {
        $(this).removeClass("active");
        removeActiveModule($(this).attr("id"));
    } else {
        $(this).addClass("active");
        addActiveModule($(this).attr("id"));
    }

    updateNavBar();
});