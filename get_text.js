// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: contentScriptFunc,
//         args: ['action'],
//     });
// });

// function contentScriptFunc(name) {
//     alert(`"${name}" executed`);
// }

// // This callback WILL NOT be called for "_execute_action"
// chrome.commands.onCommand.addListener((command) => {
//     console.log(`Command "${command}" called`);
// });


document.addEventListener ('keydown',(shortcut)=> {
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
exports=text;

// chrome.runtime.sendMessage("hello World");
