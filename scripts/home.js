$(() => {
    $("#batteries-input .number").html(batteries);
    $("#strikes-input .number").html(strikes);
    $("#car-input").attr("checked", getIndicator("car").state);
    $("#frk-input").attr("checked", getIndicator("frk").state);
    $("#parallel-input").attr("checked", getPort("parallel").state);
    $("#serial-input").val(serial.input);

    validateInputs();
});

//#region Serial Number
$("body").on("input", "#serial-input", () => {
    const input = $("#serial-input").val().toUpperCase();
    $("#serial-input").val(input);
    setSerial({ 
        input: input,
        vowel: /[aeiou]/gi.test(input),
        lastOdd: input.charAt(input.length - 1) % 2 === 1
    });
});
//#endregion

//#region Indicators
$("body").on("click", "#car-input", () =>  { 
    setIndicator("car", { state: $("#car-input").prop("checked") });
});

$("body").on("click", "#frk-input", () =>  { 
    setIndicator("frk", { state: $("#frk-input").prop("checked") });
});
//#endregion

//#region Batteries/Strikes Input
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

$("body").on("click", "#strikes-input .minus", () => {
    if(strikes <= 0)
        return;

    $("#strikes-input .number").html(removeStrike());
    
    validateInputs();
});

$("body").on("click", "#strikes-input .plus", () => {
    if(strikes >= 2)
        return;

    $("#strikes-input .number").html(addStrike());

    validateInputs();
});

function validateInputs() {
    if(batteries <= 0)
        $("#batteries-input .minus").addClass("disabled");
    else
        $("#batteries-input .minus").removeClass("disabled");

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

//#region Ports
$("body").on("click", "#parallel-input", () =>  { 
    setPort("parallel", { state: $("#parallel-input").prop("checked") });
});
//#endregion

