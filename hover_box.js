
//Hover box HTML injection
var html_injection = document.createElement("div");
html_injection.setAttribute("id", "chrome_extension_hoverbox");
html_injection.innerHTML =
    `<div id="word" class="titles"><span class="bold">Word: </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus mi quis sem laoreet, ac scelerisque
lacus</div>
<div id="origin" class="titles"><span class="bold">Origin: </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus mi quis sem laoreet, ac scelerisque
lacus</div>
<div id="meaning" class="titles"><span class="bold">Meaning: </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus mi quis sem laoreet, ac scelerisque
lacus</div>
<div id="example" class="titles"><span class="bold">Example: </span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer luctus mi quis sem laoreet, ac scelerisque
lacus</div>`;
document.body.appendChild(html_injection);

//Setting up the CSS for the Hover box
// $("#chrome_extension_hoverbox").css({
//     "border": "1px grey solid",
//     "width": "20vw",
//     "position": "absolute",
//     "padding": "5px",
//     "background-color": "white",
//     "border-radius": "5px",
// });

//hover box hide
$('#chrome_extension_hoverbox').hide();

$(document).on("mouseup", function () {

    //taking the highlighted text
    var highlight = window.getSelection();
    const range = window.getSelection().getRangeAt(0);

    if (highlight.toString().length > 1) {
        //creating a new element span
        var newElement = document.createElement("span");
        newElement.setAttribute("class", "highlight");
        range.surroundContents(newElement);

        // mouse tracking
        $('.highlight').mousemove(function (e) {
            $("#chrome_extension_hoverbox").css('top', e.pageY + 10).css('left', e.pageX + 10);
        });

        // hover box show/hide
        $('.highlight').hover(function () {
            $('#chrome_extension_hoverbox').show();
        }, function () {
            $('#chrome_extension_hoverbox').hide();
        });
    }
    else {

        // removing the span's
        $('.highlight').contents().unwrap();
    }
    selected.removeAllRanges();
});