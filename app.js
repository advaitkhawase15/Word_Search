const https = require("https");
const express = require("express");
const { response } = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})

// import * as text from './content.js';
// var text = require('./get_text.js');

// "background": {
//     "scripts":["get_text.js"]
// },
// "permissions": [
//     "activeTab"
// ]
app.use(
    express.urlencoded({
        extended: true
    })
)

// app.use(express.json())
var result = [], response_statusCode = "", selectedText = "";
app.post('/', (req, res) => {
    selectedText = req.body.fname;
    word_search(selectedText);
    setTimeout(() => {
        if (response_statusCode === 200) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Word: ' + result[0] + '</h1><h2>Origin: ' + result[1] + '</h2>');
            res.end();
        }
        else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(`<h1>` + result[0] + `</h1>`);
            res.end();
        }
    }, 2000);
})

// var selectedText = text.toString();
// var selectedText = "greed";
// word_search(selectedText);
// word_search();

function word_search(text) {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response_statusCode = response.statusCode;
        response.on("data", function (data) {
            const body = JSON.parse(data);
            // const audio = body[0].phonetics[0].audio;
            // console.log(audio);
            // player.play(audio, function (err) {})
            // console.log(body);
            if (response_statusCode === 200) {
                const word = body[0].word;
                const origin = body[0].origin;
                const definition = body[0].meanings[0].definitions[0].definition;
                const example = body[0].meanings[0].definitions[0].example;
                result = [word, origin, definition, example];
                console.log("Word: " + word);
                console.log("Origin: " + origin);
                console.log("Meaning: " + definition);
                console.log("Example: " + example);
            }
            else {
                const message = body.message;
                result = [message];
            }
        })
    })
}