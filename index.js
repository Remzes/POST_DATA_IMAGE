let server = require('./server.js');
let router = require('./router');
let requestHandlers = require('./requestHandlers');

let handle = {
    "/": requestHandlers.start,
    "/start": requestHandlers.start,
    "/upload": requestHandlers.upload,
    "/show": requestHandlers.show
};

server.start(router.route, handle);