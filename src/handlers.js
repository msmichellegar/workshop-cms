var fs = require('fs');
var querystring = require('querystring');

function handler (request, response) {
    var endpoint = request.url;

    if (endpoint === "/") {
        response.writeHead(200, {"Content-Type": "text/html"});

        fs.readFile(__dirname + '/../public/index.html', function(error, file) {
          if (error) {
            console.log(error);
            return;
          }

          response.end(file);
        });

    } else if (endpoint === "/create-post") {
        var allTheData = '';

        response.writeHead(302, {"Location": "/"});

        request.on('data', function (chunkOfData) {
            allTheData += chunkOfData;
        });

        request.on('end', function () {
            var convertedData = querystring.parse(allTheData);

            response.end();
        });

    } else {
        var contentType = request.headers.accept.split(',')[0];

        response.writeHead(200, {"Content-Type": contentType});

        fs.readFile(__dirname + "/../public" + endpoint, function(error, file) {
            if (error) {
              console.log(error);
              return;
            }

            response.end(file);
        });
    }

}

module.exports = handler;
