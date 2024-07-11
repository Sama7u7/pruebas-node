const http = require("node:http");
const { findAvaliblePort } = require("./11freeport.js");

const dport = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
  console.log("Solicitud recibida");
  res.end("Hola padrino");
});

findAvaliblePort(dport).then((port) => {
  server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
  });
});

// comando para puerto defecto node server.js
// comando para definir el puerto $env:PORT=4000; node server.js
