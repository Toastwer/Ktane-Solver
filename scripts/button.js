let color = "";
let text = "";
let strip = "";

$("#color-section").hide();
$("#result2-section").hide();

$(() => {
    $("#batteries-input .number").html(batteries);
    $("#car-input").attr("checked", getIndicator("car").state);
    $("#frk-input").attr("checked", getIndicator("frk").state);

    validateInputs();
});

$("body").on("click", "#batteries-input .minus", () => {
    if(batteries <= 0)
        return;

    $("#batteries-input .number").html(removeBattery());
    
    validateInputs();
});

$("body").on("click", "#batteries-input .plus", () => {
    $("#batteries-input .number").html(addBattery());

    validateInputs();
});

function validateInputs() {
    if(batteries <= 0) {
        $("#batteries-input .minus").addClass("disabled");
    } else {
        $("#batteries-input .minus").removeClass("disabled");
    }
}

$("body").on("click", ".color-input .button-hollow", function() {
    const _color = $(this).attr("class").split(" ")[1];

    if(color != "")
        $(`.color-input .${color}`).removeClass("active");

    $(this).addClass("active");
    color = _color;

    tryResult();
});

$("body").on("click", ".text-input .button-hollow", function() {
    const _text = $(this).attr("id");

    if(text != "")
        $(`.text-input #${text}`).removeClass("active");

    $(this).addClass("active");
    text = _text;

    tryResult();
});

$("body").on("click", ".strip-input .button-hollow", function() {
    const _strip = $(this).attr("class").split(" ")[1];

    if(strip != "")
        $(`.strip-input .${strip}`).removeClass("active");

    $(this).addClass("active");
    strip = _strip;

    stripResult();
});
    
function tryResult() {
    if(color != "" && text != "") {
        calculateResult();
    }
}

function calculateResult() {
    if(color === "blue" && text === "abort") {
        holdButton();
    } else if(batteries > 1 && text === "detonate") {
        pressButton();
    } else if(color === "white" && getIndicator("car").state) {
        holdButton();
    } else if(batteries > 2 && getIndicator("frk").state) {
        pressButton();
    } else if(color === "yellow") {
        holdButton();
    } else if(color === "red" && text === "hold") {
        pressButton();
    } else {
        holdButton();
    }
}

function pressButton() {
    $("#color-section").fadeOut("fast");
    $("#result2-section").fadeOut("fast");

    $("#outTitle1").html("Result:");
    $("#outText1").html("Press the button and quickly release it");
}

function holdButton() {
    $("#outTitle1").html("Step one:");
    $("#outText1").html("<b>Hold</b> the button down");

    $('body,html').animate({scrollTop: $(".footer").height()}, 500); 

    $("#color-section").fadeIn("fast");
    $("#result2-section").fadeIn("fast");
}

function stripResult() {
    switch(strip) {
        case "blue":
            $("#outText2").html("Release the button when the timer has a <b>4</b> in any position");
            break;
        case "yellow":
            $("#outText2").html("Release the button when the timer has a <b>5</b> in any position");
            break;
        default:
            $("#outText2").html("Release the button when the timer has a <b>1</b> in any position");
            break;
    }
}
