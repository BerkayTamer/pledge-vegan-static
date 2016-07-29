var request = require('request');
request('https://berkaytamer.github.io/top-vegan-quotes/api.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body); // Show the HTML for the Google homepage.
    }
});
