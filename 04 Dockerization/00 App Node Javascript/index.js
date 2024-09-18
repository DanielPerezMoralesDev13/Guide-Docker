// Autor: Daniel Benjamin Perez Morales
// GitHub: https://github.com/DanielPerezMoralesDev13
// Correo electrónico: danielperezdev@proton.me
const { createServer } = require('node:http');

const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req, res) => {
    console.log("Request from", req.socket.remoteAddress);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

// Ver si recibimos la señal SIGTERM
process.on("SIGTERM", () => {
    console.log("Received SIGTERM");
    // Limpiar Sockets, Ficheros, Liberar memoria
    process.exit(0);
});

server.listen(port, hostname, () => {
    // Paramtros de consola es una lista
    console.log(process.argv);
    console.log(`Server running at http://${hostname}:${port}/`);
});
