console.log("here it is");

document.addEventListener('keydown', (shortcut) => {
    if (shortcut.ctrlKey && shortcut.keyCode === 77) {
        getSelectionText();
    }
})
var text = "";
function getSelectionText() {
    text = window.getSelection().toString();
    var selectedText = text.toString();
    console.log(selectedText);
    //return text;
    // word_search(text);
}
// $http({
//     url: './app.js',
//     method: "POST",
//     data: user
// })
//     .then(response => text
//         // success
//     );
