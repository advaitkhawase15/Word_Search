
var funcToInject = function () {
    var selection = window.getSelection();

    return (selection.rangeCount > 0) ? selection.toString() : '';
};

var jsCodeStr = ';(' + funcToInject + ')();';

var result = [];

function word_search(selectedText, sendResponse) {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + selectedText;
    var statusCode = true;
    fetch(url)
        .then(response => response.text()
            .then(statusCode = response.status))
        .then(result => {
            // console.log(result);
            const body = JSON.parse(result);
            if (statusCode === 200) {
                const word = body[0].word;
                const origin = body[0].origin;
                const definition = body[0].meanings[0].definitions[0].definition;
                const example = body[0].meanings[0].definitions[0].example;
                result = [statusCode, word, origin, definition, example];
                // console.log("Word: " + word);
                // console.log("Origin: " + origin);
                // console.log("Meaning: " + definition);
                // console.log("Example: " + example);
            }
            else {
                const message = body.message;
                // console.log(message);
                result = [statusCode, message];
            }
            if (sendResponse === 'content') {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        from: "background_result",
                        result: result
                        // }, function (response) {
                        //         console.log(response.farewell);
                        // // removing the span's
                        // $('.highlight').contents().unwrap();
                        // $("#chrome_extension_hoverbox").remove();
                    });
                });
            }
            else if (sendResponse === 'popup') {
                chrome.runtime.sendMessage({ from: "background_result", result: result });
            }
        })

}

chrome.commands.onCommand.addListener(function (cmd) {
    if (cmd === 'TextRead') {
        chrome.tabs.executeScript({
            code: jsCodeStr,
            allFrames: true
        }, function (selectedTextPerFrame) {
            if (chrome.runtime.lastError) {
                console.log('ERROR: ' + chrome.runtime.lastError.message);
                alert('ERROR: ' + chrome.runtime.lastError.message);
            } else if ((selectedTextPerFrame.length > 0) && (typeof (selectedTextPerFrame[0]) === 'string')) {
                // console.log('Selected text: ' + selectedTextPerFrame[0]);
                word_search(selectedTextPerFrame[0], "content");
            }
        });
    }
});

chrome.runtime.onMessage.addListener(
    function (msg) {
        if (msg.from === 'popup') {
            console.log(msg.word);
            word_search(msg.word, msg.from);
        }
    });