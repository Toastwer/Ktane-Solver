let positions = [];
let labels = [];
let activeStage = "1-1";

$(".stage1.2, .stage1.3, .stage2, .stage3, .stage4, .stage5").hide();
$(() => {
    
});

$("body").on("click", ".button-hollow", function() {
    const stage = $(this).parent().parent().attr("class").split(" ")[1];
    const stageInt = parseInt(stage.charAt(stage.length - 1));
    const substage = parseInt($(this).parent().parent().attr("class").split(" ")[2]);
    const buttonNum = parseInt($(this).attr("id"));

    $(this).parent().find(".active").removeClass("active");
    $(this).addClass("active");

    checkActiveStage(stage, substage);

    if(substage === 1) {
        let resultType = "";
        const result = getResult(stageInt, buttonNum);
        if(Number.isInteger(result.data)) {
            if(result.type === "pos") {
                positions[stage] = result.data;
                resultType = "pos";
            } else if(result.type === "label") {
                labels[stage] = result.data;
                resultType = "label";
            }
        } else {
            const requested = parseInt(result.type);
            if(result.data === "pos") {
                positions[stage] = positions["stage" + requested];
                resultType = "pos";
            } else if(result.data === "label") {
                labels[stage] = labels["stage" + requested];
                resultType = "label";
            }
        }

        let outText = "";
        if(resultType === "pos") {
            outText = "Press the <b>" + numToWord(positions[stage]) + "</b> button";
        } else if(resultType === "label") {
            outText = "Press the button with a <b>" + labels[stage] + "</b> on it";
        }

        nextStage(`${stageInt}-${substage}-${outText}-${result.ask}`);
    } else if(substage === 3) {
        if($(`.${stage}.3 .title`).html().includes("Number"))
            labels[stage] = buttonNum;
        else
            positions[stage] = buttonNum;
        
        nextStage(parseInt(stage.charAt(stage.length - 1)) + "-" + 
            parseInt($(this).parent().parent().attr("class").split(" ")[2]));
    }
});

function checkActiveStage(stage, substage) {
    const stageInt = parseInt(stage.charAt(stage.length - 1));
    const arr = activeStage.split("-").map(x => parseInt(x));

    for (let i = arr[0]; i > 0; i--) {
        if(stageInt < i) {
            $(`.stage${i} .button-hollow`).removeClass("active");
            $(`.stage${i}`).hide();
        }
        else if(stageInt === i && substage < arr[1]) {
            $(`.stage${i}.3 .button-hollow`).removeClass("active");
            $(`.stage${i}.3`).hide();
        }
    }

    activeStage = stage + "-" + substage;
}

function nextStage(data) {
    const dataArr = data.split("-");

    const stage = parseInt(dataArr[0]);
    const substage = parseInt(dataArr[1]);

    if(substage === 1) {
        activeStage = stage + "-3";
        $(`.stage${stage}.2 .outText`).html(dataArr[2]);

        $(`.stage${stage}.2`).fadeIn(200);

        if(dataArr[3] === "pos") {
            $(`.stage${stage}.3 .title`).html("Position of that button:");
            $(`.stage${stage}.3`).delay(200).fadeIn(200);
        } else if(dataArr[3] === "label") {
            $(`.stage${stage}.3 .title`).html("Number on that button:");
            $(`.stage${stage}.3`).delay(200).fadeIn(200);
        } else {
            activeStage = (stage + 1) + "-1";
            $(`.stage${stage + 1}.1`).delay(200).fadeIn(200);
        }
        $('body,html').animate({scrollTop: $(".container").height()}, 1000); 
    } else if(substage === 3) {
        activeStage = (stage + 1) + "-1";
        $(`.stage${stage + 1}.1`).fadeIn(200);
        $('body,html').animate({scrollTop: $(".container").height()}, 500); 
    }
}

function getResult(stage, num) {
    switch (stage) {
        case 1:
            switch (num) {
                case 1:
                    return { data: 2, type: "pos", ask: "label" };
                case 2:
                    return { data: 2, type: "pos", ask: "label" };
                case 3:
                    return { data: 3, type: "pos", ask: "label" };
                case 4:
                    return { data: 4, type: "pos", ask: "label" };
            }
            break;
        case 2:
            switch (num) {
                case 1:
                    return { data: 4, type: "label", ask: "pos" };
                case 2:
                    return { data: "pos", type: "1", ask: "label" };
                case 3:
                    return { data: 1, type: "pos", ask: "label" };
                case 4:
                    return { data: "pos", type: "1", ask: "label" };
            }
            break;
        case 3:
            switch (num) {
                case 1:
                    return { data: "label", type: "2", ask: "none" };
                case 2:
                    return { data: "label", type: "1", ask: "none" };
                case 3:
                    return { data: 3, type: "pos", ask: "label" };
                case 4:
                    return { data: 4, type: "label", ask: "none" };
            }
            break;
        case 4:
            switch (num) {
                case 1:
                    return { data: "pos", type: "1", ask: "label" };
                case 2:
                    return { data: 1, type: "pos", ask: "label" };
                case 3:
                    return { data: "pos", type: "2", ask: "label" };
                case 4:
                    return { data: "pos", type: "2", ask: "label" };
            }
            break;
        case 5:
            switch (num) {
                case 1:
                    return { data: "label", type: "1", ask: "none" };
                case 2:
                    return { data: "label", type: "2", ask: "none" };
                case 3:
                    return { data: "label", type: "4", ask: "none" };
                case 4:
                    return { data: "label", type: "3", ask: "none" };
            }
            break;
    }
}

function outText(stage, text) {
    let textArr = text.split("*");
    textArr.forEach((entry, index) => {
        if(index < textArr.length - 1)
            textArr[index] = entry + index % 2 === 0 ? "<b>" : "</b>";
    });
    $(`.${stage}.2 .outText`).html(textArr.join(""));
}