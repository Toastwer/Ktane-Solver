let wires = 3;
let data = [];

$(() => {
    $("#serial-input").val(serial.input);
    updateWireInputs();
    validateInputs();
});

$("body").on("input", ".wiresimp #serial-input", () => {
    const input = $("#serial-input").val().toUpperCase();
    $("#serial-input").val(input);
    setSerial({ 
        input: input,
        vowel: /[aeiou]/.test(input),
        lastOdd: input.charAt(input.length - 1) % 2 === 1
    });
});

$("body").on("click", ".wiresimp #wires-input .minus", () => {
    if(wires <= 3)
        return;

    wires--;
    $("#wires-input .number").html(wires);
    validateInputs();
    updateWireInputs();
});

$("body").on("click", ".wiresimp #wires-input .plus", () => {
    if(wires >= 6)
        return;

    wires++;
    $("#wires-input .number").html(wires);
    validateInputs();
    updateWireInputs();
});

function validateInputs() {
    if(wires <= 3) {
        $("#wires-input .minus").addClass("disabled");
        $("#wires-input .plus").removeClass("disabled");
    } else if(wires >= 6) {
        $("#wires-input .plus").addClass("disabled");
        $("#wires-input .minus").removeClass("disabled");
    }
}

$("body").on("click", ".wiresimp .wire-container .wire button", function() {
    const id = $(this).attr("id");
    const wire = id.split("-")[0];

    if(data[wire] != null)
        $(`#${wire}-${data[wire].color}`).removeClass("active");

    data[wire] = { color: id.split("-")[1] };
    $("#" + id).addClass("active");

    tryResult();
});

function updateWireInputs() {
    let text = "";
    for (let i = 1; i < wires + 1; i++) {
        let color = "";
        if(data["wire" + i] != null)
            color = data["wire" + i].color;

        text += `<div class="wire">
                    <p class="text">Wire ${i}: </p>
                    <button class="button-hollow red ${color === "red" ? "active" : ""}" id="wire${i}-red">Red</button>
                    <button class="button-hollow blue ${color === "blue" ? "active" : ""}" id="wire${i}-blue">Blue</button>
                    <button class="button-hollow yellow ${color === "yellow" ? "active" : ""}" id="wire${i}-yellow">Yellow</button>
                    <button class="button-hollow black ${color === "black" ? "active" : ""}" id="wire${i}-black">Black</button>
                    <button class="button-hollow white ${color === "white" ? "active" : ""}" id="wire${i}-white">White</button>
                </div>`;
    }

    $("#wires-input .number").html(wires);
    $(".wire-container").html(text);
    tryResult();
}

function tryResult() {
    if(Object.keys(data).length >= wires)
        calculateResult();
}

function calculateResult() {
    let colors = [];
    colors[1] = data["wire1"].color;
    colors[2] = data["wire2"].color;
    colors[3] = data["wire3"].color;
    switch (wires) {
        case 3:
            if(colors[1] !== "red" && colors[2] !== "red" && colors[3] !== "red") {
                setResult(`Cut the *second* wire`);
            } else if(colors[3] === "white") {
                setResult(`Cut the *third* wire`)
            } else if(amountOfColor(colors, "blue") > 1) {
                setResult(`Cut the *${numToWord(getPosOf(colors, "blue", "last"))}* wire`)
            } else {
                setResult(`Cut the *third* wire`);
            }
            break;
        case 4:
            colors[4] = data["wire4"].color;
            if(amountOfColor(colors, "red") > 1 && serial.lastOdd) {
                setResult(`Cut the *${numToWord(getPosOf(colors, "red", "last"))}* wire`)
            } else if(colors[4] === "yellow" && amountOfColor(colors, "red") === 0) {
                setResult(`Cut the *first* wire`);
            } else if(amountOfColor(colors, "blue") === 1) {
                setResult(`Cut the *first* wire`);
            } else if(amountOfColor(colors, "yellow") > 1) {
                setResult(`Cut the *fourth* wire`);
            } else {
                setResult(`Cut the *second* wire`);
            }
            break;
        case 5:
            colors[4] = data["wire4"].color;
            colors[5] = data["wire5"].color;
            if(colors[5] === "black" && serial.lastOdd) {
                setResult(`Cut the *fourth* wire`);
            } else if(amountOfColor(colors, "red") === 1 && amountOfColor(colors, "yellow") > 1) {
                setResult(`Cut the *first* wire`);
            } else if(amountOfColor(colors, "black") === 0) {
                setResult(`Cut the *second* wire`);
            } else {
                setResult(`Cut the *first* wire`);
            }
            break;
        case 6:
            colors[4] = data["wire4"].color;
            colors[5] = data["wire5"].color;
            colors[6] = data["wire6"].color;
            if(amountOfColor(colors, "yellow") === 0 && serial.lastOdd) {
                setResult(`Cut the *third* wire`);
            } else if(amountOfColor(colors, "yellow") === 1 && amountOfColor(colors, "white") > 1) {
                setResult(`Cut the *fourth* wire`);
            } else if(amountOfColor(colors, "red") === 0) {
                setResult(`Cut the *sixth* wire`);
            } else {
                setResult(`Cut the *fourth* wire`);
            }
            break;
        default:
            return -1;
    }
}

function amountOfColor(colors, color) {
    let amount = 0;
    colors.forEach(entry => {
        if(entry === color)
            amount++;
    });
    return amount;
}

function getPosOf(colors, color, pos) {
    let out = 0;

    switch (pos) {
        case "last":
            colors.forEach((entry, index) => {
                if(entry === color)
                out = index;
            });
            break;
    }

    return out;
}

function numToWord(num) {
    switch (num) {
        case 1:
            return "first";
        case 2:
            return "second";
        case 3:
            return "third";
        case 4:
            return "fourth";
        case 5:
            return "fifth";
        case 6:
            return "sixth";
    }
}

function setResult(text) {
    if(text == null)
        text = "...";
    else {
        let textArr = text.split("*");
        textArr.forEach((entry, index) => {
            if(index < textArr.length - 1) {
                if(index % 2 === 0) {
                    textArr[index] = entry + "<b>";
                } else {
                    textArr[index]  = entry + "</b>";
                }
            }
        });
        text = textArr.join("");
    }

    $("#outText").html(text);
}