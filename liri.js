var fs = require("dotenv").config();

console.log(fs);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log(spotify);
console.log(client);

// ----------------------------------------------------------------------------------------------------------------------------
// Node Package Samples


// Twitter Node Package Sample

var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

var params = { screen_name: 'nodejs' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        console.log(tweets);
    }
});

// Spotify Node Pacakge Sample (need ID and Secret) 

// var Spotify = require('node-spotify-api');

// var spotify = new Spotify({

//     id: <your spotify client id>,
//       secret: <your spotify client secret>
//             });

// spotify.search({type: 'track', query: 'All the Small Things' }, function (err, data) {
//     if (err) {
//         return console.log('Error occurred: ' + err);
//             }

//             console.log(data);
//         });

