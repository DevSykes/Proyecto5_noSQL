const express = require("express");
const { connect } = require("./utils/db");
const movieRoutes = require("./routes/movie.routes");

// conecta a bbdd
connect();

const PORT = 3000;
const server = express();

// para que no de fallos extraños al procesar peticiones JSON (creo)
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// usararchivo de rutas para todo lo que empieza por /movies
server.use("/movies", movieRoutes);

// rutas no encontradas (404)
server.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  return next(error);
});

// control general de errores (500)
server.use((err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json(err.message || "Error interno del servidor");
});

server.listen(PORT, () => {
  console.log(`Servidor de películas ejecutándose en http://localhost:${PORT}`);
});
