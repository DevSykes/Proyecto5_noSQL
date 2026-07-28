const express = require('express');
const { connect } = require('./utils/db');

connect();

const PORT = 3000;
const server = express();

const Movie = require('./models/Movie');

const router = express.Router();

// para que no de fallos extraños al procesar peticiones JSON (creo)
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// ENDPOINTS

// 1. todas las películas
router.get('/movies', async (req, res) => {
	try {
		const movies = await Movie.find();
		return res.status(200).json(movies);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// 2. película por ID
router.get('/movies/id/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const movie = await Movie.findById(id);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json('No movie found by this id');
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});

//  peliculas por titulo
router.get('/movies/title/:title', async (req, res) => {
	const { title } = req.params;

	try {
		const movieByTitle = await Movie.find({ title });
		return res.status(200).json(movieByTitle);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// películas por genero
router.get('/movies/genre/:genre', async (req, res) => {
	const { genre } = req.params;

	try {
		const movieByGenre = await Movie.find({ genre });
		return res.status(200).json(movieByGenre);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// 5. películas por año superior a X
router.get('/movies/year/:year', async (req, res) => {
	const { year } = req.params;

	try {
		const movieByYear = await Movie.find({ year: { $gt: year } });
		return res.status(200).json(movieByYear);
	} catch (err) {
		return res.status(500).json(err);
	}
});

server.use('/', router);

server.listen(PORT, () => {
	console.log(`Server running in http://localhost:${PORT}`);
});
