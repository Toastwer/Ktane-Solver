const words = ["about", "after", "again", "below", "could", "every", "first", "found", "great", "house", 
    "large", "learn", "never", "other", "place", "plant", "point", "right", "small", "sound", "spell", "still", 
    "study", "their", "there", "these", "thing", "think", "three", "water", "where", "which", "world", "would", "write"];

let inputs = [];

$(() => {
    const _password =  JSON.parse(sessionStorage.getItem("password"));
    if(_password != null) inputs = _password;
    inputs.forEach((input, index) =>  input == null ? "" : $("#" + index).val(input.replace(/[^a-z]/ig, "").toUpperCase()));

    const matches = getWordMatches();
    $("#outText").html((matches.length === 0 || matches.length === words.length) ? "..." : matches.join(", "));
});

$("body").on("input", ".text-input input", function() {
    const input = $(this).val().replace(/[^a-z]/ig, "").toUpperCase();
    $(this).val(input);

    const slot = $(this).attr("id");
    inputs[slot] = input.toLowerCase();

    const matches = getWordMatches();
    $("#outText").html((matches.length === 0 || matches.length === words.length) ? "..." : matches.join(", "));

    sessionStorage.setItem("password", JSON.stringify(inputs));
});

function getWordMatches() {
    const remove = [];
    words.slice().forEach(word => {
        inputs.forEach((input, i) => {
            if(input.length > 0)
                if(!input.includes(word.charAt(i)))
                    remove.push(word);
        });
    });
    return words.slice().filter(word => remove.indexOf(word) < 0);;
}