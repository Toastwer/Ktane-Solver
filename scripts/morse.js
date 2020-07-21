let input = "";

$(() => {
    const _morse = sessionStorage.getItem("morse");
    if(_morse != null) input = _morse;
    showInput();
    calculateResult();
});

$("body").on("click", ".button-hollow, .button-filled", function() {
    const id = $(this).attr("id");
    
    switch (id) {
        case "short":
            input += "•";
            break;
        case "long":
            input += "▬";
            break;
        case "pause":
            input += "█";
            break;
        case "back":
            if(input.length > 0)
                input = input.slice(0, -1);
            break;
        case "reset":
            input = "";
            break;
    }

    sessionStorage.setItem("morse", input);

    showInput();
    calculateResult();
});

function showInput() {
    $(".current-input").html(input
        .replaceAll("•", `<img src="/icons/morse-dot.png" class="dot">`)
        .replaceAll("▬", `<img src="/icons/morse-dash.png" class="dash">`)
        .replaceAll("█", `<div class="space"></div>`));
}

function calculateResult() {
    const morse = input.split("█");
    if(morse.length === 0 || morse[0] === "") {
        result("...");
    } else {
        switch (morse[0]) {
            case "•••": //s
                if(morse.length === 1) {
                    result("...");
                } else {
                    switch (morse[1]) {
                        case "••••": //sh
                            result("3.505");
                            break;
                        case "•▬••": //sl
                            result("3.522")
                            break;
                        case "▬": //st
                            if(morse.length === 2) {
                                result("...");
                            } else {
                                switch (morse[3]) {
                                    case "•▬•": //str
                                        result("3.545");
                                        break;
                                    case "•": //ste
                                        result("3.582");
                                        break;
                                    case "••": //sti
                                        result("3.592");
                                        break;
                                    default:
                                        result("null");
                                        break;
                                }
                            }
                            break;
                        default:
                            result("null");
                            break;
                    }
                }
                break;
            case "▬•••": //b
                if(morse.length === 1) {
                    result("...");
                } else {
                    switch (morse[2]) {
                        case "▬▬▬": //bo
                            if(morse.length === 3) {
                                result("...");
                            } else {
                                switch (morse[3]) {
                                    case "▬••▬": //box
                                        result("3.545");
                                        break;
                                    case "▬▬": //bom
                                        result("3.545");
                                        break;
                                    default:
                                        result("null");
                                        break;
                                }
                            }
                            break;
                        case "•▬•": //br
                        if(morse.length === 3) {
                            result("...");
                        } else {
                            switch (morse[3]) {
                                case "•": //bre
                                    result("3.572");
                                    break;
                                case "••": //bri
                                    result("3.575");
                                    break;
                                default:
                                    result("null");
                                    break;
                            }
                        }
                        break;
                        case "••": //bi
                            result("3.552");
                            break;
                        case "•": //be
                            result("3.600");
                            break;
                        default:
                            result("null");
                            break;
                    }
                }
                break;
                case "••••": //h
                result("3.515");
                break;
            case "▬": //t
                result("3.532");
                break;
            case "▬•••": //l
                result("3.542");
                break;
            case "••▬•": //f
                result("3.555");
                break;
            case "•••▬": //v
                result("3.595");
                break;
            default:
                result("null");
                break;
        }
    }
}

function result(MHz) {
    if(MHz === "null") {
        $("#outText").addClass("red");
        $("#outText").html("No solution exists for the given input");
    } else if(MHz === "...") {
        $("#outText").removeClass("red");
        $("#outText").html("...");
    } else {
        $("#outText").removeClass("red");
        $("#outText").html(`Input the frequency <b>${MHz}</b> MHz`);
    }
}