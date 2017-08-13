let http = require('http');
let url = require('url');

function start(route, handle) {
    http.createServer((req, res) => {
        let pathname = url.parse(req.url).pathname;

        console.log();
        console.log("------");
        console.log();
        console.log("Request for " + pathname + " received");
        route(handle, pathname, res, req);


    }).listen(8080);
    console.log("Server has started");
}

exports.start = start;