let indicators = new Object();
let ports = new Object(); 
let serial = new Object();
let batteries = 0;

$(() => {
    $("#content").css("margin-bottom", $(".footer").height());

    $(".navbar").html(` <li class="navbar-item navbar-item-home">
                            <a>Home</a>
                        </li>
                        <li class="navbar-item navbar-item-button">
                            <a>Button</a>
                        </li>
                        <li class="navbar-item navbar-item-keypad">
                            <a>Keypads</a>
                        </li>
                        <li class="navbar-item navbar-item-simon">
                            <a>Simon Says</a>
                        </li>
                        <li class="navbar-item navbar-item-whoof">
                            <a>Who's on First</a>
                        </li>
                        <li class="navbar-item navbar-item-memory">
                            <a>Memory</a>
                        </li>
                        <li class="navbar-item navbar-item-morse">
                            <a>Morse Code</a>
                        </li>
                        <li class="navbar-item navbar-item-wiresimp">
                            <a>Simple Wires</a>
                        </li>
                        <li class="navbar-item navbar-item-wirecomp">
                            <a>Complicated Wires</a>
                        </li>
                        <li class="navbar-item navbar-item-wireseq">
                            <a>Wire Sequences</a>
                        </li>
                        <li class="navbar-item navbar-item-maze">
                            <a>Maze</a>
                        </li>
                        <li class="navbar-item navbar-item-password">
                            <a>Password</a>
                        </li>`);

    $("body").on("mouseenter", ".navbar", () => {
        $("#overlay").css("background-color", "rgba(0, 0, 0, 0.5)");
    });
    
    $("body").on("mouseleave", ".navbar", () => {
        $("#overlay").css("background-color", "rgba(0, 0, 0, 0)");
    });

    $(".navbar").on('click', "a", (e) => {
		const classes = $(e.target).parent()[0].classList;
		loadPage(classes[classes.length - 1].split("navbar-item-")[1]);
    });
    
    const _indicators = JSON.parse(sessionStorage.getItem("indicators"));
    if(_indicators != null) indicators = _indicators;

    const _ports = JSON.parse(sessionStorage.getItem("ports"));
    if(_ports != null) ports = _ports;

    const _serial = JSON.parse(sessionStorage.getItem("serial"));
    if(_serial != null) serial = _serial;

    const _batteries =  parseInt(sessionStorage.getItem("batteries"));
    if(!isNaN(_batteries)) batteries = _batteries;
});

function addBattery() {
    batteries++;
    sessionStorage.setItem("batteries", batteries);
    return batteries;
}

function removeBattery() {
    batteries--;
    sessionStorage.setItem("batteries", batteries);
    return batteries;
}

function setIndicator(key, input) {
    indicators[key] = input;
    sessionStorage.setItem("indicators", JSON.stringify(indicators));
    return indicators;
}

function setPort(key, input) {
    ports[key] = input;
    sessionStorage.setItem("ports", JSON.stringify(ports));
    return ports;
}

function setSerial(input) {
    serial = input;
    sessionStorage.setItem("serial", JSON.stringify(serial));
    return serial;
}

function getIndicator(indicator) {
	if(indicators[indicator] == undefined)
		return { state: false };
	else
		return indicators[indicator];
}

function getPort(port) {
	if(ports[port] == undefined)
		return { state: false };
	else
		return ports[port];
}

function loadPage(name) {
    const arr = window.location.href.split("/");
    arr.splice(arr.length - 1, 1);
    const path = `${arr.join("/")}/${name}.html`;
    window.location.replace(path);
}