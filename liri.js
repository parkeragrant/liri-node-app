var dotEnv = require("dotenv").config();

var keys = require("./keys");

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var inquirer = require("inquirer");

var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var movieSplit = "";
var queryUrl = "";


function mySpotifyFunction() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "What song?",
                name: "songName"
            },
        ])
        .then(function (songResponse) {

            spotify.search({ type: 'track', query: songResponse.songName, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log(JSON.stringify(data.tracks.items[0].artists[0].name, null, 2));
                console.log(JSON.stringify(data.tracks.items[0].name, null, 2));
                console.log(JSON.stringify(data.tracks.items[0].preview_url, null, 2));
                console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));

            });

        });

};

function myMovieFunction() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What movie?",
                name: "movieName"
            },
        ])
        .then(function (movieResponse) {

            movieSplit = movieResponse.movieName.replace(/ /g, "+");

            queryUrl = "http://www.omdbapi.com/?t=" + movieSplit + "&y=&plot=short&apikey=trilogy";

            // console.log(queryUrl);


            request(queryUrl, (error, response, body) => {

                // If the request is successful (i.e. if the response status code is 200)
                if (!error && response.statusCode === 200) {

                    // console.log(JSON.stringify(response, null, 2));


                    console.log("The movie's title is: " + JSON.parse(body).Title);
                    console.log("The movie's release year is: " + JSON.parse(body).Year);
                    console.log("The movie's IMDB rating is: " + JSON.parse(body).imdbRating);
                    console.log("The movie's country is: " + JSON.parse(body).Country);
                    console.log("The movie's Rotten Tomatoe score is: " + JSON.parse(body).Ratings[1].Value);
                    console.log("The movie's language is: " + JSON.parse(body).Language);
                    console.log("The movie's plot is: " + JSON.parse(body).Plot);
                    console.log("The movie's actors are: " + JSON.parse(body).Actors);


                }
            });

        });

}


inquirer
    .prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "How can I help you today?",
            name: "command"
        }

    ])
    .then(function (promptResponse) {

        switch (promptResponse.command) {
            case "my-tweets":
                tweets();
                break;

            case "spotify-this-song":

                mySpotifyFunction();

                break;

            case "movie-this":

                myMovieFunction();

                break;

            // case "do-what-it-says":

            //     break;

            default:
                console.log("Liri does not know that command");

        }

    })



function tweets() {

    var params = {
        screen_name: '@_parker_al',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var text in tweets) {

                console.log("");
                console.log(tweets[text].text);
                console.log("");
                console.log("=============================");

            };
        };

    });
};