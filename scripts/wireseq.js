let wireSeqJson;

$(() => {
    $.getJSON("../scripts/wireseq.json", function (data) {
        wireSeqJson = data;
    });

    init();
});

function init() {
    let html = "";
    for (let i = 0; i < 5; i++) {
        const wire3 = 3 * (i + 1);
        const wire1 = wire3 - 2;
        const wire2 = wire3 - 1;
        html += 
        `<div class="panel">
            <p class="title">Panel ${i + 1}:</p>
    
            <div class="wire" id="${wire1}">
                <p class="subtitle">Wire ${wire1}:</p>
                <button class="button-hollow red"  id="wire${wire1}-red">Red</button>
                <button class="button-hollow blue" id="wire${wire1}-blue">Blue</button>
                <button class="button-hollow black" id="wire${wire1}-black">Black</button>
                <p class="v-break">To</p>
                <button class="button-hollow gray" id="wire${wire1}-A">A</button>
                <button class="button-hollow gray" id="wire${wire1}-B">B</button>
                <button class="button-hollow gray" id="wire${wire1}-C">C</button>
                <p class="result">...</p>
            </div>
            <div class="wire" id="${wire2}">
                <p class="subtitle">Wire ${wire2}:</p>
                <button class="button-hollow red"  id="wire${wire2}-red">Red</button>
                <button class="button-hollow blue" id="wire${wire2}-blue">Blue</button>
                <button class="button-hollow black" id="wire${wire2}-black">Black</button>
                <p class="v-break">To</p>
                <button class="button-hollow gray" id="wire${wire2}-A">A</button>
                <button class="button-hollow gray" id="wire${wire2}-B">B</button>
                <button class="button-hollow gray" id="wire${wire2}-C">C</button>
                <p class="result">...</p>
            </div>
            <div class="wire" id="${wire3}">
                <p class="subtitle">Wire ${wire3}:</p>
                <button class="button-hollow red"  id="wire${wire3}-red">Red</button>
                <button class="button-hollow blue" id="wire${wire3}-blue">Blue</button>
                <button class="button-hollow black" id="wire${wire3}-black">Black</button>
                <p class="v-break">To</p>
                <button class="button-hollow gray" id="wire${wire3}-A">A</button>
                <button class="button-hollow gray" id="wire${wire3}-B">B</button>
                <button class="button-hollow gray" id="wire${wire3}-C">C</button>
                <p class="result">...</p>
            </div>
        </div>`;
    }
    $(".container .section").html(html);

    for (let i = 4; i <= 15; i++) {
        $(`#${i} .button-hollow`).addClass("disabled");
    }
}

let colors = new Map();
let letters = new Map();

$("body").on("click", ".panel button", function() {
    if($(this).hasClass("disabled"))
        return;
    
    const wire = $(this).attr("id").split("-")[0];
    const wireInt = parseInt(wire.substring(4));
    const type = $(this).attr("id").split("-")[1];

    if($(this).hasClass("gray")) {
        if(letters.has(wireInt)) {
            if(letters.get(wireInt) === type) {
                $(this).removeClass("active");
                letters.delete(wireInt);
                checkActive();
                getResults();
                return;
            } else {
                $(`#${wire}-${letters.get(wireInt)}`).removeClass("active");
            }
        }

        $(this).addClass("active");
        letters.set(wireInt, type);
    } else {
        if(colors.has(wireInt)) {
            if(colors.get(wireInt) === type) {
                $(this).removeClass("active");
                colors.delete(wireInt);
                checkActive();
                getResults();
                return;
            } else {
                $(`#${wire}-${colors.get(wireInt)}`).removeClass("active");
                $(this).addClass("active");
                colors.set(wireInt, type);
            }
        }

        $(this).addClass("active");
        colors.set(wireInt, type);
    }

    checkActive();
    getResults();
});

function checkActive() {
    for (let i = 1; i <= 5; i++) {
        if((colors.has(i * 3) && letters.has(i * 3)) ||
           (colors.has(i * 3 - 1) && letters.has(i * 3 - 1)) ||
           (colors.has(i * 3 - 2) && letters.has(i * 3 - 2)))
            activatePanel(i + 1);
        else
            deactivatePanel(i + 1);
    }
}

const panelObjects = ["red", "blue", "black", "A", "B", "C"];
function activatePanel(panel) {
    for (let i = (panel * 3 - 2); i <= panel * 3; i++) {
        panelObjects.forEach(obj => {
            $(`#wire${i}-${obj}`).removeClass("disabled");
        });
    }
}

function deactivatePanel(panel) {
    for (let i = (panel * 3 - 2); i <= panel * 3; i++) {
        panelObjects.forEach(obj => {
            $(`#wire${i}-${obj}`).addClass("disabled");
            $(`#wire${i}-${obj}`).removeClass("active");
        });
        colors.delete(i);
        letters.delete(i);
    }
}

function getResults() {
    let redWires = 0;
    let blueWires = 0;
    let blackWires = 0;

    for (let i = 1; i <= 15; i++) {
        if(colors.has(i) && letters.has(i)) {
            const color = colors.get(i);

            if(color === "red") {
                redWires++;
                wireSeqJson[color][redWires].includes(letters.get(i)) ? out(i, "cut") : out(i, "keep");
            } else if(color === "blue") {
                blueWires++;
                wireSeqJson[color][blueWires].includes(letters.get(i)) ? out(i, "cut") : out(i, "keep");
            } else if(color === "black") {
                blackWires++;
                wireSeqJson[color][blackWires].includes(letters.get(i)) ? out(i, "cut") : out(i, "keep");
            }

        } else {
            out(i, "null");
        }
    }
}

function out(wire, result) {
    if(result === "cut") {
        $(`#${wire} .result`).addClass("red");
        $(`#${wire} .result`).removeClass("green");
        $(`#${wire} .result`).html("Cut");
    } else if(result === "keep") {
        $(`#${wire} .result`).addClass("green");
        $(`#${wire} .result`).removeClass("red");
        $(`#${wire} .result`).html("Don't cut");
    } else {
        $(`#${wire} .result`).removeClass("red");
        $(`#${wire} .result`).removeClass("green");
        $(`#${wire} .result`).html("...");
    }
}