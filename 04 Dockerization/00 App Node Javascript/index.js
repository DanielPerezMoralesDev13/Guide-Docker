// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me
const { createServer } = require('node:http');

const hostname = '172.17.0.2';
const port = 3000;

const server = createServer((req, res) => {
    console.log("Request from", req.socket.remoteAddress);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
