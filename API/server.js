const http = require("node:http");
const fs = require("node:fs");
const desiredPort = process.env.PORT ?? 1234;

const requestHandler = (req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("<h1>Bienvenido a  la pagína API de pruebas-node</h1>");
  } else if (req.url === "/contacto") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("<h1>Tienes dudas? contactanos.</h1>");
  } else if (req.url === "/imagen") {
    res.setHeader("Content-Type", "image/jpeg");

    fs.readFile("./head.jpg", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("No se encontró la imagen");
      } else {
        res.statusCode = 200;
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("<h1>404-Página no encontrada :(</h1> ");
  }
};

const server = http.createServer(requestHandler);

server.listen(desiredPort, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${desiredPort}`
  );
});

server.on("error", (err) => {
  console.error(`Error en el servidor: ${err.message}`);
});

// comando para puerto defecto node server.js
// comando para definir el puerto $env:PORT=4000; node server.js
