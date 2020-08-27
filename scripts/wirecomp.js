let wireData = new Map();

$(() => {
    let wires = "";
    for (let i = 0; i < 6; i++) {
        wires += 
        `<div class="wire wire${i}">
            <p class="text">Wire ${i + 1}:</p>
            <div class="v-break">
                <button class="button-hollow s3 red"        id="wire${i}-red">Red</button>
                <button class="button-hollow s3 red-white"  id="wire${i}-red_white">Red/White</button>
                <button class="button-hollow s3 blue"       id="wire${i}-blue">Blue</button>
                <button class="button-hollow s3 blue-white" id="wire${i}-blue_white">Blue/White</button>
                <button class="button-hollow s3 red-blue"   id="wire${i}-red_blue">Red/Blue</button>
                <button class="button-hollow s3 white"      id="wire${i}-white">White</button>
            </div>
            <div class="v-break">
                <button class="button-hollow gray"   id="wire${i}-star">Star</button>
                <button class="button-hollow yellow" id="wire${i}-light">Light</button>
            </div>
            <div class="out">
                <p>...</p>
            </div>
        </div>`
    }
    $(".wires").html(wires);

    $("#batteries-input .number").html(batteries);
    $("#parallel-input").attr("checked", getPort("parallel").state);
    $("#serial-input").val(serial.input);

    validateInputs();
});

$("body").on("click", "#parallel-input", () =>  { 
    setPort("parallel", { state: $("#parallel-input").prop("checked") });

    getResults();
});

$("body").on("click", "#batteries-input .minus", () => {
    if(batteries <= 0)
        return;

    $("#batteries-input .number").html(removeBattery());
    
    validateInputs();
    getResults();
});

$("body").on("click", "#batteries-input .plus", () => {
    $("#batteries-input .number").html(addBattery());

    validateInputs();
    getResults();
});

$("body").on("input", "#serial-input", () => {
    const input = $("#serial-input").val().toUpperCase();
    $("#serial-input").val(input);
    setSerial({ 
        input: input,
        vowel: /[aeiou]/i.test(input),
        lastOdd: input.charAt(input.length - 1) % 2 === 1
    });

    getResults();
});

function validateInputs() {
    if(batteries <= 0) {
        $("#batteries-input .minus").addClass("disabled");
    } else {
        $("#batteries-input .minus").removeClass("disabled");
    }
}

$("body").on("click", ".wires .wire button", function() {
    const id = $(this).attr("id");
    const wire = id.split("-")[0];
    const wireInt = parseInt(wire.charAt(wire.length - 1));
    const data = id.split("-")[1];

    let _wireData = wireData.get(wireInt);
    if(_wireData == null)
        _wireData = { color: null, star: false, light: false };

    if(data === "star") {
        if(_wireData.star) {
            $(this).removeClass("active");
            _wireData.star = false;
            wireData.set(wireInt, _wireData);
        } else {
            $(this).addClass("active");
            _wireData.star = true;
            wireData.set(wireInt, _wireData);
        }
    } else if(data === "light") {
        if(_wireData.light) {
            $(this).removeClass("active");
            _wireData.light = false;
            wireData.set(wireInt, _wireData);
        } else {
            $(this).addClass("active");
            _wireData.light = true;
            wireData.set(wireInt, _wireData);
        }
    } else {
        $(this).addClass("active");

        if(_wireData.color != null) {
            if(_wireData.color === data)
                return;
            
            $(`#${wire}-${_wireData.color}`).removeClass("active");
        }
        
        _wireData.color = data;

        wireData.set(wireInt, _wireData);
    }

    getResults();
});

function getResults() {
    for (let i = 0; i < 5; i++) {
        if(!wireData.has(i))
            continue;

        const data = wireData.get(i);
        console.log(serial.lastOdd);
        console.log(data.star);
        console.log(data.light);
        
        switch (data.color) {
            case "white":
                if( (!data.light) ||
                    (data.light && data.star && batteries >= 2)) {
                    out(i, "cut");
                    continue;
                }
                break;
            case "red": case "red_white":
                if( (!data.light && (data.star || !serial.lastOdd)) ||
                    (data.light && batteries >= 2)) {
                    out(i, "cut");
                    continue;
                }
                break;
            case "blue": case "blue_white":
                if( (!data.light && !data.star && !serial.lastOdd) ||
                    (data.light && getPort("parallel").state)) {
                    out(i, "cut");
                    continue;
                }
                break;
            case "red_blue":
                if( (!data.light && ((!data.star && !serial.lastOdd) || (data.star && getPort("parallel").state))) ||
                    (data.light && !data.star && !serial.lastOdd)) {
                    out(i, "cut");
                    continue;
                }
                break;
        }

        out(i, "keep");
    }
}

function out(wire, result) {
    if(result === "cut") {
        $(`.wire${wire} .out`).addClass("red");
        $(`.wire${wire} .out`).removeClass("green");
        $(`.wire${wire} .out p`).html("Cut");
    } else if(result === "keep") {
        $(`.wire${wire} .out`).addClass("green");
        $(`.wire${wire} .out`).removeClass("red");
        $(`.wire${wire} .out p`).html("Don't cut");
    } else {
        $(`.wire${wire} .out`).removeClass("red");
        $(`.wire${wire} .out`).removeClass("green");
        $(`.wire${wire} .out p`).html("...");
    }
}