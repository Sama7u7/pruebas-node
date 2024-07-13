const express = require("express");
const app = express();

app.disable("x-powered-by");

const driverJSON = require("./drivers.json");

const PORT = process.env.PORT ?? 1234;

//Middleware
app.use((req, res, next) => {
  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();

  let body = "";

  // Recibir datos
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  // Procesar datos
  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();
    req.body = data;
    res.status(201).json(data);
  });
});

app.get("/", (req, res) => {
  res.json({ driverJSON });
});

app.post("/drivers", (req, res) => {
  res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
