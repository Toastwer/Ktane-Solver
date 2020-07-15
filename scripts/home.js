let car = { state: false };
let frk = { state: false };

let parallel = { state: false };

$(() => {
    $("#batteries-input .number").html(batteries);
    setIndicators();
    setPorts();
});

function reloadPage() {
    $("#serial-input").val(serial.input);
}

//#region Serial Number
$("body").on("input", "#serial-input", () => {
    const input = $("#serial-input").val().toUpperCase();
    $("#serial-input").val(input);
    serial = { 
        input: input,
        vowel: /[aeiou]/.test(input),
        lastOdd: input.charAt(input.length - 1) % 2 === 1
    }
});


//#endregion

//#region Indicators
$("body").on("click", "#car-input", () =>  { 
    car = { state: $("#car-input").prop("checked") };
    setIndicators();
});

$("body").on("click", "#frk-input", () =>  { 
    frk = { state: $("#frk-input").prop("checked") };
    setIndicators();
});

function setIndicators() {
    indicators = { car, frk };
}
//#endregion

//#region Batteries Input
$("body").on("click", "#batteries-input .minus", () => {
    if(batteries <= 0)
        return;

    batteries--;
    $("#batteries-input .number").html(batteries);
});

$("body").on("click", "#batteries-input .plus", () => {
    batteries++;
    $("#batteries-input .number").html(batteries);
});
//#endregion

//#region Ports
$("body").on("click", "#parallel-input", () =>  { 
    parallel = { state: $("#parallel-input").prop("checked") };
    setPorts();
});

function setPorts() {
    ports = { parallel };
}
//#endregion

