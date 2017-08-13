function route(handle, pathname, response, req) {
    console.log("About to route a request for " + pathname);
    if (typeof handle[pathname] === 'function'){
       handle[pathname](response, req);
    } else {
        console.log("No request handle found for " + pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not Found");
        response.end();
    }
}

exports.route = route;