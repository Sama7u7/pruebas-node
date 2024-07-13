const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const bestsellersData = require("./bestsellers.json");

const app = express();
app.disable("x-powered-by");

// Middleware para analizar el cuerpo de la solicitud JSON
app.use(express.json());

// Acceder al array dentro del objeto bestsellers
const bestsellers = bestsellersData.bestsellers;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/bestsellers", (req, res) => {
  res.json(bestsellers);
});

// Ruta para obtener un bestseller por su categoría
app.get("/thing", (req, res) => {
  const { category } = req.query;
  if (category) {
    // Filtrar por categoría en el array de bestsellers
    const bestsellersByCategory = bestsellers.filter(
      (bestseller) =>
        bestseller.category.toLowerCase() === category.toLowerCase()
    );
    res.json(bestsellersByCategory);
  } else {
    res.json(bestsellers);
  }
});

// Ruta para obtener productos dentro de un rango de precios
app.get("/price-range", (req, res) => {
  const { minPrice, maxPrice } = req.query;

  let filteredProducts = [];

  // Verificar si los parámetros de precio están presentes
  if (minPrice || maxPrice) {
    bestsellers.forEach((bestseller) => {
      // Filtrar productos dentro del rango de precios
      const filtered = bestseller.products.filter((product) => {
        if (minPrice && maxPrice) {
          return (
            product.price >= parseFloat(minPrice) &&
            product.price <= parseFloat(maxPrice)
          );
        } else if (minPrice) {
          return product.price >= parseFloat(minPrice);
        } else if (maxPrice) {
          return product.price <= parseFloat(maxPrice);
        }
        return true;
      });
      filteredProducts = filteredProducts.concat(filtered);
    });
    res.json(filteredProducts);
  } else {
    // Si no se proporciona ningún parámetro, devolver todos los productos
    bestsellers.forEach((bestseller) => {
      filteredProducts = filteredProducts.concat(bestseller.products);
    });
    res.json(filteredProducts);
  }
});

// Ruta para crear un nuevo bestseller

app.post("/category", (req, res) => {
  const { category, products } = req.body;

  // Validar los datos recibidos
  if (!category || !Array.isArray(products)) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  // Crear la nueva categoría
  const newCategory = {
    category,
    products,
  };

  // Agregar la nueva categoría al array de bestsellers
  bestsellers.push(newCategory);

  // Guardar los datos actualizados en el archivo JSON
  fs.writeFile(
    "./bestsellers.json",
    JSON.stringify({ bestsellers }, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to save data" });
      }
      res.status(201).json(newCategory);
    }
  );
});

const PORT = process.env.PORT ?? 1234;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
