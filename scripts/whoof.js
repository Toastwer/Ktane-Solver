let stage1Input = "";
let stage2Input = "";
let stage1Json;
let stage2Json;

let divHeight = -1;

$(".dropdown-content").hide();
$(".stage2").hide();
$(".stage3").hide();
$(() => {
    $.getJSON("../scripts/whoof.json", function (data) {
            const stage1 = data["stage1"];
            
            let html = "";
            Object.keys(stage1).forEach(key => {
                if(key === "_blank")
                    html += `<button class="dropdown-item yellow" id="${key}">Blank</button>`
                else
                    html += `<button class="dropdown-item" id="${key}">${key}</button>`
            });
            $(".stage1 .dropdown-content").html(html);

            stage1Json = stage1;

            const stage2 = data["stage2"];

            html = "";
            Object.keys(stage2).forEach(key => {
                html += `<button class="dropdown-item" id="${key}">${key}</button>`
            });
            $(".stage2 .dropdown-content").html(html);

            stage2Json = stage2;

            divHeight = $(".dropdown-content").height();


            const _stage1Input = sessionStorage.getItem("stage1Input");
            if(_stage1Input != null) {
                stage1Input = _stage1Input;
        
                $(".stage1 .dropdown-head").html(stage1Input);
                $(".stage1 .dropdown-head").removeClass("placeholder");
            
                if($(this).attr("id") === "_blank")
                    $(".stage1 .dropdown-head").addClass("yellow");
                else
                    $(".stage1 .dropdown-head").removeClass("yellow");
            }
        
            const _stage2Input = sessionStorage.getItem("stage2Input");
            if(_stage2Input != null) {
                stage2Input = _stage2Input;
        
                $(".stage2 .dropdown-head").html(stage2Input);
                $(".stage2 .dropdown-head").removeClass("placeholder");
            } 
        }
    ).then(() => {
        if(stage1Input != "")
            stage2();
        
        if(stage2Input != "") {
            $(".stage3").delay(200).fadeIn(200);
            getResult();
        }
    });
});

$("body .stage1").on("click", ".dropdown-head", function() {
    if($(this).hasClass("active")) {
        $(".stage1 .dropdown-content").show();
        $(".stage1 .dropdown-content").animate({height: 0}, 
            function() { 
                $(this).fadeOut(50);
                $(".stage1 .dropdown-head").removeClass("active");
            });
    } else {
        $(".stage1 .dropdown-head").addClass("active");
        $(".stage1 .dropdown-content").css({height: 0});
        $(".stage1 .dropdown-content").fadeIn(50).animate({height: divHeight}, 
            function() {
                $(this).addClass("active")
        });
    }
});

$("body .stage1").on("click", ".dropdown-item", function() {
    stage1Input = $(this).html();
    $(".stage1 .dropdown-head").html(stage1Input);
    $(".stage1 .dropdown-head").removeClass("placeholder");

    if($(this).attr("id") === "_blank")
        $(".stage1 .dropdown-head").addClass("yellow");
    else
        $(".stage1 .dropdown-head").removeClass("yellow");

    $(".stage1 .dropdown-head").removeClass("active");
    $(".stage1 .dropdown-content").fadeOut(200);
    stage2();

    sessionStorage.setItem("stage1Input", stage1Input);
});

function stage2() {
    let btn = "";
    switch (stage1Json[stage1Input]) {
        case "tl":
            btn = "top left";
            break;
        case "tr":
            btn = "top right";
            break;
        case "ml":
            btn = "middle left";
            break;
        case "mr":
            btn = "middle right";
            break;
        case "bl":
            btn = "bottom left";
            break;
        case "br":
            btn = "bottom right";
            break;
    }
    $("#stage2Title").html("Text on the <b>" + btn + "</b> button:");
    $(".stage2").delay(200).fadeIn(200);
}


$("body .stage2").on("click", ".dropdown-head", function() {
    if($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(".stage2 .dropdown-content").show();
        $(".stage2 .dropdown-content").animate({height: 0}, function() { $(this).fadeOut(50) });
    } else {
        $(this).addClass("active");
        $(".stage2 .dropdown-content").css({height: 0});
        $(".stage2 .dropdown-content").fadeIn(50).animate({height: divHeight});
    }
});

$("body .stage2").on("click", ".dropdown-item", function() {
    stage2Input = $(this).html();
    $(".stage2 .dropdown-head").html(stage2Input);
    $(".stage2 .dropdown-head").removeClass("placeholder");

    $(".stage2 .dropdown-head").removeClass("active");
    $(".stage2 .dropdown-content").fadeOut(200);

    $(".stage3").delay(200).fadeIn(200);
    getResult();

    sessionStorage.setItem("stage2Input", stage2Input);
});

function getResult() {
    if(stage2Input === "")
        $("#outText").html("...");
    else
        $("#outText").html("<b>" + stage2Json[stage2Input].replaceAll(",", "</b> ><b>") + "</b>");
}