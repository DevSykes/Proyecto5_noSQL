const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// ----------------------------------------------------
// 1. GET: obtener todas las películas
// ----------------------------------------------------

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    return next(err);
  }
});

// ----------------------------------------------------
// 2. GET: obtener película por id
// ----------------------------------------------------

router.get("/id/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res
        .status(404)
        .json("No se ha encontrado ninguna película con ese ID");
    }
  } catch (err) {
    return next(err);
  }
});

// ----------------------------------------------------
// 3. GET: obtener películas por título
// ----------------------------------------------------

router.get("/title/:title", async (req, res, next) => {
  const { title } = req.params;
  try {
    const movieByTitle = await Movie.find({ title: new RegExp(title, "i") });
    return res.status(200).json(movieByTitle);
  } catch (err) {
    return next(err);
  }
});

// ----------------------------------------------------
// 4. GET: obtener películas por género
// ----------------------------------------------------

router.get("/genre/:genre", async (req, res, next) => {
  const { genre } = req.params;
  try {
    const movieByGenre = await Movie.find({ genre: new RegExp(genre, "i") });
    return res.status(200).json(movieByGenre);
  } catch (err) {
    return next(err);
  }
});

// ----------------------------------------------------
// 5. GET: obtener películas con año superior al indicado
// ----------------------------------------------------

router.get("/year/:year", async (req, res, next) => {
  const { year } = req.params;
  try {
    const movieByYear = await Movie.find({ year: { $gt: year } });
    return res.status(200).json(movieByYear);
  } catch (err) {
    return next(err);
  }
});

// ----------------------------------------------------
// 6. POST: crear una nueva película
// ----------------------------------------------------

router.post("/", async (req, res, next) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      genre: req.body.genre,
    });

    const createdMovie = await newMovie.save();
    return res.status(201).json(createdMovie);
  } catch (err) {
    return next(err);
  }
});

// ----------------------------------------------------
// 7. PUT: modificar o actualizar una pelicula existente
// ----------------------------------------------------

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieModify = new Movie(req.body);
    movieModify._id = id; // Mantenemos el mismo ID original

    const movieUpdated = await Movie.findByIdAndUpdate(id, movieModify, {
      new: true,
    });

    if (!movieUpdated) {
      return res.status(404).json("No se encontró la película para actualizar");
    }

    return res.status(200).json(movieUpdated);
  } catch (err) {
    return next(err);
  }
});

// ----------------------------------------------------
// 8. DELETE: eliminar una película por id
// ----------------------------------------------------

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDeleted = await Movie.findByIdAndDelete(id);

    if (!movieDeleted) {
      return res.status(404).json("No se encontró la película para eliminar");
    }

    return res.status(200).json({
      message: "Película eliminada correctamente",
      movie: movieDeleted,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
