let allModules = [];
let activeModules = new Set();
let json;

let indicators = new Object();
let ports = new Object(); 
let serial = new Object();
let batteries = 0;
let strikes = 0;

$(() => {
    const _activeModules = new Set(JSON.parse(sessionStorage.getItem("activeModules")));
    if(_activeModules != null) activeModules = _activeModules;
    
    $.getJSON("../scripts/data.json", function (data) {
        for(const key in data["modules"]["normal"]) allModules.push(key);
        for(const key in data["modules"]["needy"]) allModules.push(key);
        for(const key in data["modules"]["mod"]) allModules.push(key);

        if(activeModules.size === 0) {
            data["modules"]["defaultActive"].forEach(module => {
                addActiveModule(module);
            });
        }

        json = data;

        updateNavBar();
    });

    $("#content").css("margin-bottom", $(".footer").height());

    if($("body .navbar:hover").length != 0)
        $("#overlay").css("background-color", "rgba(0, 0, 0, 0.5)");

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

    const _strikes =  parseInt(sessionStorage.getItem("strikes"));
    if(!isNaN(_strikes)) strikes = _strikes;
});

function addActiveModule(elem) {
    activeModules.add(elem);
    sessionStorage.setItem("activeModules", JSON.stringify(Array.from(activeModules)));
}

function removeActiveModule(elem) {
    activeModules.delete(elem);
    sessionStorage.setItem("activeModules", JSON.stringify(Array.from(activeModules)));
}

function updateNavBar() {
    let html = `<li class="navbar-item navbar-item-home">
                    <a>Home</a>
                </li>`;
    allModules.forEach(val => {
        if(val && activeModules.has(val)) {
            const name = json["modules"]["normal"][val] || json["modules"]["needy"][val] || json["modules"]["mod"][val];
            html += `<li class="navbar-item navbar-item-${val}">
                        <a>${name}</a>
                    </li>`;
        }
    });
    html += `<li class="navbar-item navbar-item-settings">
                <a>Settings</a>
            </li>`;

    $(".navbar").html(html);
}

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

function addStrike() {
    strikes++;
    sessionStorage.setItem("strikes", strikes);
    return strikes;
}

function removeStrike() {
    strikes--;
    sessionStorage.setItem("strikes", strikes);
    return strikes;
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

function numToWord(num) {
    switch (num) {
        case 1:
            return "first";
        case 2:
            return "second";
        case 3:
            return "third";
        case 4:
            return "fourth";
        case 5:
            return "fifth";
        case 6:
            return "sixth";
    }
}