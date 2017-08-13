let querystring = require('querystring');
let fs = require('fs');
let formidable = require('formidable');

function start(response) {
    console.log("Request handler 'start' was called");
    let body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="Upload File" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.setHeader("Content-Type", "text/html");
    response.write(body);
    response.end();
}

function upload(res, req) {
    console.log("Request handler 'upload' was called");
    let form = new formidable.IncomingForm();
    console.log("about to parse...");
    form.parse(req, (err, fields, files) => {
       console.log("parsing done");

       fs.rename(files.upload.path, "/tmp/test.png", (err) => {
          if (err){
              fs.unlink("/tmp/test.png");
              fs.rename(files.upload.path, "/tmp/test.png");
          }
       });

       res.writeHead(200, {"Content-Type": "text/html"});
       res.write("received image: <br />");
       res.write("<img src='/show' />");
       res.end();
    });
}

function show(res, postData) {
    console.log("Request handler 'show' was called");
    fs.readFile(__dirname + "/tmp/test.png", "binary", function (error, file) {
        if (error) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.write("error" + "\n");
            res.write(error.toString());
            res.end();
        } else {
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(file, "binary");
            res.end();
        }
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;