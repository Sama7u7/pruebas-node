const http = require("node:http");

const driverJSON = require("./drivers.json");

const processRequest = (req, res) => {
  const { url, method } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/drivers":
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ drivers: driverJSON }));
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(`<h1>404 Not Found</h1>`);
      }

    case "POST":
      switch (url) {
        case "/drivers-create": {
          let body = "";

          // Recibir datos
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          // Procesar datos
          req.on("end", () => {
            const data = JSON.parse(body);
            res.writeHead(201, {
              "Content-Type": "application/json; charset=utf-8",
            });
            res.end(JSON.stringify(data));
          });

          break;
        }
        default:
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(`<h1>404 Not Found</h1>`);
      }
  }
};
const PORT = process.env.PORT || 3000;

const server = http.createServer(processRequest);

server.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
