const http = require('http');
const Utils = require('./modules/utils.js');
const FileManager = require('./modules/fileManager.js');

class Server {
    constructor(port) {
        this.port = port;
        this.utils = new Utils();
        this.fileManager = new FileManager();
    }

    start() {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
    handleRequest(req, res) {
            const url = new URL(req.url, `http://${req.headers.host}`);

            if (url.pathname === "/COMP4537/labs/3/getDate"){
                const name = url.searchParams.get("name");
                const message = this.utils.getDate(name);

                res.writeHead(200, { 
                    'Content-Type': 'text/html' });

                res.end(
                    `<p style="color: blue;">${message}</p>`
                );
            } else if (url.pathname === "/COMP4537/labs/3/writeFile"){
                const text = url.searchParams.get("text");

                this.fileManager.appendText("file.txt", text, (err) => {
                    if (err) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        res.end("Error writing to file");
                        return;
                    }

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    
                    res.end(text);
                        });
            } else if (url.pathname === "/COMP4537/labs/3/readFile/file.txt"){
                this.fileManager.readFile("file.txt", (err, data) => {
                    if (err) {
                        res.writeHead(404, {
                            'Content-Type': 'text/plain'
                        });

                        res.end("file.txt not found");
                        return;
                    } 

                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    });
                    
                    res.end(data);
                });
        }
    }
}

const port = process.env.PORT || 3000;

const server = new Server(port);
server.start();

