const movies = [
  {
    title: "The Matrix",
    director: "Hermanas Wachowski",
    year: 1999,
    genre: "Acción",
  },
  {
    title: "The Matrix Reloaded",
    director: "Hermanas Wachowski",
    year: 2003,
    genre: "Acción",
  },
  {
    title: "Buscando a Nemo",
    director: "Andrew Stanton",
    year: 2003,
    genre: "Animación",
  },
  {
    title: "Buscando a Dory",
    director: "Andrew Stanton",
    year: 2016,
    genre: "Animación",
  },
  {
    title: "Interestelar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Ciencia ficción",
  },
  {
    title: "50 primeras citas",
    director: "Peter Segal",
    year: 2004,
    genre: "Comedia romántica",
  },
];

const mongoose = require("mongoose");
const Movie = require("../models/Movie");

const seedDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/movies-api");
    console.log("conectando a la base de datos para la semilla...");

    console.log("¿Qué es Movie?:", Movie);

    const allMovies = await Movie.find();

    if (allMovies.length > 0) {
      await Movie.collection.drop();
      console.log("Colección borrada");
    }
    await Movie.insertMany(movies);
    console.log("Películas insertadas a la base de datos");
  } catch (error) {
    console.error("Error al ejecutar:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Conexión cerrada.");
  }
};

seedDB();
