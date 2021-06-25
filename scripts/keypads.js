let selectedKeys = [];

const solutions = [
    ["balloon", "at", "upsidedowny", "squigglyn", "squidknife", "hookn", "leftc"], 
    ["euro", "balloon", "leftc", "cursive", "hollowstar", "hookn", "questionmark"], 
    ["copyright", "pumpkin", "cursive", "doublek", "meltedthree", "upsidedowny", "hollowstar"], 
    ["six", "paragraph", "bt", "squidknife", "doublek", "upsidedowny", "smileyface", "questionmark"], 
    ["pitchfork", "smileyface", "bt", "leftc", "paragraph", "dragon", "filledstar"], 
    ["six", "euro", "tracks", "ae", "pitchfork", "nwithhat", "omega"]];

$(() => {
    const _selectedKeys = JSON.parse(sessionStorage.getItem("selectedKeys"));
    if(_selectedKeys != null) {
        selectedKeys = [...new Set(_selectedKeys)];
        selectedKeys.forEach(selectedKey => {
            $("." + selectedKey).addClass("active");
        });
    } 
    tryResult();
});

$(".icons").on("click", "img", function() {
    if($(this).hasClass("active")) {
        $(this).removeClass("active");
        selectedKeys = selectedKeys.filter(key => key != $(this).attr("class"));
    } else {
        selectedKeys.push($(this).attr("class"))
        $(this).addClass("active");
    }
    sessionStorage.setItem("selectedKeys", JSON.stringify(selectedKeys));

    tryResult();
});

function tryResult() {
    if(selectedKeys.length === 4) {
        calculateResult();
    } else if(selectedKeys.length > 4) {
        $("#outIcons").html(`<p class="red">You can only select <b>4</b> icons</p>`);
    } else {
        $("#outIcons").html("...");
    }
}

function calculateResult() {
    let solution = [];
    solutions.forEach(column => {
        let contains = true;
        selectedKeys.forEach(key => {
            if(!column.includes(key))
                contains = false;
        });

        if(contains)
            solution = column.filter(key => selectedKeys.includes(key));
    });

    if(solution.length > 0) {
        const solutionOut = [];
        solution.forEach((icon, index) => {
            let html = `<img class="${icon}" src="../icons/keypads/${icon}.png">`
            if(index < solution.length - 1)
                html += `<img class="arrow" src="../icons/arrow.png">`;

            solutionOut[index] = html;
        });
        $("#outIcons").html(solutionOut.join(""));
    } else {
        $("#outIcons").html(`<p class="red">No solution exists for that combination</p>`)
    }
}