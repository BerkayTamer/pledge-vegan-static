var request = require('request');
var fs = require('fs');

request('https://berkaytamer.github.io/top-vegan-quotes/api.json', function (error, response, data) {
    if (!error && response.statusCode == 200) {
        var authors = [];
        var data = JSON.parse(data);

        Object.keys(data).forEach(function(key) {
            authors.push(data[key].author);
        });

        fs.writeFile('index.html', authors, function (err) {
            if (err) throw err;
            console.log('Good job Berks');
        });
    }
});
