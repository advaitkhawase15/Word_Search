
//Hover box HTML injection
var html_injection = document.createElement("div");
html_injection.setAttribute("id", "chrome_extension_hoverbox");
document.body.appendChild(html_injection);

//Setting up the CSS for the Hover box
var link = document.createElement('link');
link.href = chrome.extension.getURL('hover_box.css');
link.rel = 'stylesheet';
document.getElementsByTagName("head")[0].appendChild(link);

chrome.runtime.onMessage.addListener(
    function (msg) {
        if (msg.from === "background_result") {
            var result = msg.result;
            //taking the highlighted text
            var highlight = window.getSelection();
            const range = window.getSelection().getRangeAt(0);

            if (highlight.toString().length > 1) {
                //creating a new element span
                var newElement = document.createElement("span");
                newElement.setAttribute("class", "highlight");
                range.surroundContents(newElement);

                //Changing the Hover box HTML
                if (result[0] === 200) {
                    $("#chrome_extension_hoverbox").html(
                        `<div id="word" class="titles"><span class="bold">Word: </span>` + result[1] + `</div>
                        <div id="meaning" class="titles"><span class="bold">Meaning: </span>` + result[3] + `</div>`
                    );

                    if (result[2] !== null) {
                        $("#chrome_extension_hoverbox").append(
                            `<div id="origin" class="titles"><span class="bold">Origin: </span>` + result[2] + `</div>`
                        );
                    }

                    if (result[4] !== null) {
                        $("#chrome_extension_hoverbox").append(
                            `<div id="example" class="titles"><span class="bold">Example: </span>"` + result[4] + `"</div>`
                        );
                    }
                }
                else {
                    $("#chrome_extension_hoverbox").html(
                        `<div id = "error" class="titles bold">"` + result[1] + `"</div>`
                    );
                }

                // mouse tracking
                $('.highlight').mousemove(function (e) {
                    if (e.screenX < $(window).width() / 2) {
                        $("#chrome_extension_hoverbox").css('top', e.pageY + 10).css('left', e.pageX + 10);
                        $("#chrome_extension_hoverbox").css("border-radius", "0 5px 5px 5px");
                    }
                    else {
                        $("#chrome_extension_hoverbox").css('top', e.pageY + 10).css('left', e.pageX - 190);
                        $("#chrome_extension_hoverbox").css("border-radius", "5px 0 5px 5px");
                    }

                });

                // hover box show/hide
                $('.highlight').hover(function () {
                    $('#chrome_extension_hoverbox').show();
                }, function () {
                    $('#chrome_extension_hoverbox').hide();
                });
            }
            $(document).click(function () {
                // removing the span's
                $('.highlight').contents().unwrap();
                $("#chrome_extension_hoverbox").css("display", "none");
            })
        }
    }

);

