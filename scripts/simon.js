let colors = [[[]]];

$(() => {
    $("#serial-input").val(serial.input);
    $("#strikes-input .number").html(strikes);

    validateInputs();
});

$("body").on("click", ".flash-input .button-hollow", function() {
    const _color = $(this).attr("class").split(" ")[1];

    const btn = $(this);
    btn.addClass("active");
    setTimeout(() => btn.removeClass("active"), 150);

    newColor(_color);
});

function newColor(color) {
    if(serial.vowel) {
        switch (color) {
            case "red":
                if(strikes === 0) {
                    output("blue");
                } else if(strikes === 1) {
                    output("yellow");
                } else {
                    output("green");
                }
                break;
            case "blue":
                if(strikes === 1) {
                    output("green");
                } else {
                    output("red");
                }
                break;
            case "green":
                if(strikes === 1) {
                    output("blue");
                } else {
                    output("yellow");
                }
                break;
            case "yellow":
                if(strikes === 0) {
                    output("green");
                } else if(strikes === 1) {
                    output("red");
                } else {
                    output("blue");
                }
                break;
        }
    } else {
        switch (color) {
            case "red":
                if(strikes === 0) {
                    output("blue");
                } else if(strikes === 1) {
                    output("red");
                } else {
                    output("yellow");
                }
                break;
            case "blue":
                if(strikes === 0) {
                    output("yellow");
                } else if(strikes === 1) {
                    output("blue");
                } else {
                    output("green");
                }
                break;
            case "green":
                if(strikes === 0) {
                    output("green");
                } else if(strikes === 1) {
                    output("yellow");
                } else {
                    output("blue");
                }
                break;
            case "yellow":
                if(strikes === 1) {
                    output("green");
                } else {
                    output("red");
                }
                break;
        }
    }
}

function output(color) {
    color = color.charAt(0).toUpperCase() + color.slice(1);
    let arr = getColors();
    arr.push(color);

    setColors(arr);

    update();
}

function update() {
    const arr = getColors();
    $("#outTitle").html("Button" + (arr.length > 1 ? "s" : "") + " to press:");

    let out = [];
    arr.forEach(elem => 
        out.push(`<button class="filled ${elem.toLowerCase()}">${elem}</button>`));

    $("#outText").html(out.length > 0 ? out.join(" > ") : "...");
}

function getColors() {
    const vowelArr = colors[serial.vowel ? 1 : 0] == undefined ? [] : colors[serial.vowel ? 1 : 0];
    return vowelArr[strikes] == undefined ? [] : vowelArr[strikes];
}

function setColors(arr) {
    if(colors[serial.vowel ? 1 : 0] == undefined)
        colors[serial.vowel ? 1 : 0] = [];

    colors[serial.vowel ? 1 : 0][strikes] = arr;
}

//#region Footer
$("body").on("click", "#strikes-input .minus", () => {
    if(strikes <= 0)
        return;

    $("#strikes-input .number").html(removeStrike());
    
    validateInputs();
    update();
});

$("body").on("click", "#strikes-input .plus", () => {
    if(strikes >= 2)
        return;

    $("#strikes-input .number").html(addStrike());

    validateInputs();
    update();
});

$("body").on("input", "#serial-input", () => {
    const input = $("#serial-input").val().toUpperCase();
    $("#serial-input").val(input);
    setSerial({ 
        input: input,
        vowel: /[aeiou]/i.test(input),
        lastOdd: input.charAt(input.length - 1) % 2 === 1
    });

    update();
});

function validateInputs() {
    if(strikes <= 0) {
        $("#strikes-input .minus").addClass("disabled");
        $("#strikes-input .plus").removeClass("disabled");
    } else if(strikes >= 2) {
        $("#strikes-input .minus").removeClass("disabled");
        $("#strikes-input .plus").addClass("disabled");
    } else {
        $("#strikes-input .minus").removeClass("disabled");
        $("#strikes-input .plus").removeClass("disabled");
    }
}
//#endregion