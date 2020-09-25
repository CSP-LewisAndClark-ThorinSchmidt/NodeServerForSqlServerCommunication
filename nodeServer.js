const mysql = require("mysql");
const http = require("http");
const fs = require("fs");
const {Readable} = require("stream");

let port = 10000;

console.log("Starting on port: " + port);

let connection = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password"
});

console.log("Created Connection!");
let server = http.createServer(function (req, res) {
    if (req.method === "POST") {
        console.log("Recived POST Request");
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString()
        });
        req.on('end', () => {
            let data = JSON.parse(body);
            connection.query(data["query"], function(err, result, fields) {
                if (err) { res.writeHead(500, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*"}); Readable.from(["Internal server error!"]).pipe(res); throw err; }
                let returnData = {
                    "Result": result,
                    "Fields": fields
                }
                res.writeHead(200, { "Content-Type": "text/plain", "access-Control-Allow-Origin": "*" });
                Readable.from([JSON.stringify(returnData)]).pipe(res);
            });
        });
    }
    if (req.method === "BREW") {
        res.writeHead(418, { "Content-Type": "text/plain" , "Access-Control-Allow-Origin": "*"});
        Readable.from(["I'm a teapot! The requested entity body is short and stout. Tip me over and pour me out."]).pipe(res);
    }
}).listen(port);
