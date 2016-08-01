var request = require('request');
var fs = require('fs');
var Twig = require('twig');
var async = require('async');
var twig = Twig.twig;

async.waterfall([
    function (callback) {
        fs.readFile('quotes.twig', 'utf8', function (err, contents) {
            var template = twig({
                data: contents
            });
            console.log(template)
            callback(err, template);
        });
    },
    function (template, callback) {
        request('https://berkaytamer.github.io/top-vegan-quotes/api.json', function (err, res) {
            if (err) {
                callback(err);
            }
            templateData =  JSON.parse(res.body);
            var renderedTemplate = template.render(templateData);
            callback(null, renderedTemplate);
        });
    },
    function (renderedTemplate, callback) {
        fs.writeFile('index.html', renderedTemplate, function (err, data) {
            if (err) {
                callback(err);
            }
            callback(null, data);
        });
    }
], function (err, data) {
    if (err) {
        process.stderr.write(err);
        process.exit(0);
    }
    console.log('datas written', data)
});