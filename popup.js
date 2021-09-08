console.log("here it is");

$("#search").click(function () {
    var word = $("#word").val();
    chrome.runtime.sendMessage({ from: "popup", word: word });
    console.log(word);
})

chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.from == 'background_result') {
        console.log(msg.result[0]);
        var result = msg.result;
        if (result[0] === 200){
            console.log(result[3]);
            $("body").html(
                `<div id="word" class="titles"><span class="bold">Word: </span>` + result[1] + `</div>
                <div id="meaning" class="titles"><span class="bold">Meaning: </span>` + result[3] + `</div>`
            );

            if (result[2] !== null) {
                $("body").append(
                    `<div id="origin" class="titles"><span class="bold">Origin: </span>` + result[2] + `</div>`
                );
            }

            if (result[4] !== null) {
                $("body").append(
                    `<div id="example" class="titles"><span class="bold">Example: </span>"` + result[4] + `"</div>`
                );
            }
        }
        else {
            $("body").html(
                `<div id = "error" class="titles bold">"` + result[1] + `"</div>`
            );
        }
    }
});