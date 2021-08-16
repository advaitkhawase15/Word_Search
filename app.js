const https = require("https");
const express = require("express")
// var player = require('play-sound')(opts = {player: "mplayer"})
const app = express();
// var text = require('./get_text.js');

// var selectedText = text.toString();
var selectedText = "greed";
word_search(selectedText);
// word_search();

function word_search(text) {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + text;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const body = JSON.parse(data);
            // const audio = body[0].phonetics[0].audio;
            // console.log(audio);
            // player.play(audio, function (err) {})
            // console.log(body);
            const word = body[0].word;
            const origin = body[0].origin;
            const definition = body[0].meanings[0].definitions[0].definition;
            const example = body[0].meanings[0].definitions[0].example;
            console.log("Word: "+ word);
            console.log("Origin: " + origin);
            console.log("Meaning: " + definition);
            console.log("Example: " + example);
        })
    })
}