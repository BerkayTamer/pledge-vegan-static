var request = require('request');
var fs = require('fs');
var Twig = require('twig');
var twig = Twig.twig;


fs.readFile('quotes.twig', 'utf8', function(err, contents) {

    var template = twig({
        data: contents
    });


    request('https://berkaytamer.github.io/top-vegan-quotes/api.json', function (error, response, data) {
        if (!error && response.statusCode == 200) {

            templateData = {};
            templateData.quotes = JSON.parse(data);

            var renderedTemplate = template.render(templateData);

            fs.writeFile('index.html', renderedTemplate, function (err) {
                if (err) throw err;

            });

        }
    });

});



/*


*/


