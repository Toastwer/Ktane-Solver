let mazes = [];

$(() => {
    $.getJSON("/scripts/maze.json", function (data) {
        mazes = data;
    });
});

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
        showMaze(-1);
    } else if(green.length > 2) {
        out("#You can only choose two circles");
        showMaze(-1);
    } else if(red.length > 1) {
        out("#You can only choose one endpoint");
        showMaze(-1);
    } else if(blue.length > 1) {
        out("#You can only choose one startpoint");
        showMaze(-1);
    } else {
        for (let i = 1; i <= 9; i++) {
            if(arraysEqual(green, mazes[`maze${i}`]["circles"])) {
                showMaze(i);
                return;
            }
        }

        out("#A maze with those circles does not exist");
    }
}

function showMaze(id) {
    if(id === -1) {
        for (let i = 0; i < 36; i++)
            $(`#${i + 1}`).parent().removeClass("side").removeClass("bottom");
        return;
    }
    const maze = mazes[`maze${id}`]["walls"];
    maze.forEach((element, index) => {
        element.split("").forEach(elem => {
            if(elem === "r") {
                $(`#${index + 1}`).parent().addClass("side");
            } else if(elem === "d") {
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
    let distances = [{square: blue[0], distance: 0, route: []}];
    let visited = [];
    let result = null;
    const sides = [-6, -1, 6, 1];

    let s = 0;
    while(visited.length < 36) {
        distances.forEach(elem => {
            sides.forEach(side => {
                const target = elem.square + side;
                if(target >= 1 && target <= 36 && !visited.includes(target) 
                    && !maze[getTarget(elem.square, side)].split("").includes(side % 6 === 0 ? "d" : "r") 
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

    distances.forEach(elem => {
        if(elem.square === red[0])
            if(result == null || elem.length < result.length)
                result = elem;
    });

    let arr = result.route;
    arr.push(red[0]);

    out(getPath(arr).join(", "));
}

function getPath(squares) {
    let out = [];
    squares.forEach((id, index) => {
        if(index < squares.length - 1) {
            switch (squares[index + 1] - id) {
                case -6:
                    out.push("Up");
                    break;
                case -1:
                    out.push("Left");
                    break;
                case 1:
                    out.push("Right");
                    break;
                case 6:
                    out.push("Down");
                    break;
            }
        }
    });
    return out;
}

function getTarget(id, side) {
    switch (side) {
        case -6:
            return id - 7;
        case -1:
            return id - 2;
        case 1:
            return id - 1;
        case 6:
            return id - 1;
    }
}

function isWall(id, side) {
    if(id % 6 === 0 && side === 1)
        return true;
    
    if((id - 1) % 6 === 0 && side === -1)
        return true;
    
    if(id >= 1 && id <= 6 && side === -6)
        return true;
    
    if(id >= 31 && id <= 36 && side === 6)
        return true;
    

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