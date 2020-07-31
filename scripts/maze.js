$(() => {

});

const mazes = [["", "_", "|", "", "_", "_",
               "|", "", "_|", "_", "_", "",
               "|", "_", "|", "", "_", "",
               "|", "_", "_", "_|", "_", "",
               "", "_", "|", "", "_|", "",
               "", "|", "", "|", "", ""]];

let green = [];
let red = [];
let blue = [];

$(".maze").on("click", ".square", function () {
    const id = parseInt($(this).attr("id"));
    if($(this).hasClass("green")) {
        // Red
        $(this).removeClass("green");
        $(this).removeClass("blue");
        $(this).addClass("red");
        
        red.push(id);

        if(green.includes(id))
            green.splice(green.indexOf(id), 1);
    } else if ($(this).hasClass("red")) {
        // Blue
        $(this).removeClass("green");
        $(this).removeClass("red");
        $(this).addClass("blue");

        blue.push(id);

        if(red.includes(id))
            red.splice(red.indexOf(id), 1);
    } else if ($(this).hasClass("blue")) {
        // Normal
        $(this).removeClass("red");
        $(this).removeClass("green");
        $(this).removeClass("blue");

        if(blue.includes(id))
            blue.splice(blue.indexOf(id), 1);
    } else {
        // Green
        $(this).removeClass("red");
        $(this).removeClass("blue");
        $(this).addClass("green");

        green.push(id);
    }

    getOut();
});

function getOut() { 
    if(green.length < 2) {
        out("...");
    } else if(green.length > 2) {
        out("#You can only choose two circles");
    } else if(red.length > 1) {
        out("#You can only choose one endpoint");
    } else if(blue.length > 1) {
        out("#You can only choose one startpoint");
    } else {
        if(true || red !== 0) {
            if(arraysEqual(green, [7, 18])) {
                showMaze(1);
                out("1");
            } else if(arraysEqual(green, [11, 20])) {
                out("2");
            } else if(arraysEqual(green, [22, 24])) {
                out("3");
            } else if(arraysEqual(green, [1, 19])) {
                out("4");
            } else if(arraysEqual(green, [17, 34])) {
                out("5");
            } else if(arraysEqual(green, [5, 27])) {
                out("6");
            } else if(arraysEqual(green, [2, 32])) {
                out("7");
            } else if(arraysEqual(green, [4, 21])) {
                out("8");
            } else if(arraysEqual(green, [9, 25])) {
                out("9");;
            } else {
                out("#A maze with those circles does not exist");
            }
        }
    }
}

function showMaze(id) {
    const maze = mazes[id - 1];
    maze.forEach((element, index) => {
        element.split("").forEach(elem => {
            if(elem === "|") {
                $(`#${index + 1}`).parent().addClass("side");
            } else if(elem === "_") {
                $(`#${index + 1}`).parent().addClass("bottom");
            }
        });
    });

    if(red.length === 1 && blue.length === 1 && green.length === 2)
        calcShortestRoute(maze);
}

function out(text) { 
    if(text[0] === "#") {
        $("#outText").addClass("red");
        $("#outText").html(text.substr(1));
    } else {
        $("#outText").removeClass("red");
        $("#outText").html(text);
    }
}

function calcShortestRoute(maze) {
    let distances = [{square: blue[0], distance: 0, route: [blue[0]]}];
    let visited = [];
    let result = null;
    const sides = [-6, -1, 6, 1];

    let s = 0;
    while(s <= 1000) {
        distances.forEach(elem => {
            sides.forEach(side => {
                const target = elem.square + side;
                if(target >= 1 && target <= 36 && !visited.includes(target) 
                    && !maze[target - 1].split("").includes(side % 6 === 0 ? "_" : "|") 
                    && !isWall(elem.square, side)) {
                    let _route = elem.route.slice();
                    _route.push(elem.square);
                    distances.push({square: target, distance: elem.distance + 1, route: _route});
                    visited.push(target);
                }
            });
        });

        s++;
    }

    console.log(distances);

    distances.forEach(elem => {
        if(elem.square === red[0])
            if(result == null || elem.length < result.length)
                result = elem;
    });

    console.log(result);
}

function isWall(a, b) {
    if(a % 6 === 0) {
        if(b === 1)
            return true;
    } else if((a - 1) % 6 === 0) {
        if(b === -1)
            return true;
    } else if(a >= 1 && a <= 6) {
        if(b === 6)
            return true;
    } else if(a >= 31 && a <= 36) {
        if(b === -6)
            return true;
    }

    return false;
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    a.sort((a, b) => a - b);
    b.sort((a, b) => a - b);

    for (var i = 0; i < a.length; ++i)
        if (a[i] !== b[i]) return false;

    return true;
}