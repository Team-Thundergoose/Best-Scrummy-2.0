const express = require('express');

const starWarsController = require('../controllers/starWarsController');

const router = express.Router();

//create functionality
router.get('/createBoard',
  boardController.newBoard,
  (req, res) => res.status(200).json(res.locals.newBoard)
);


//delete functionality


// router.get('/species',
//   starWarsController.getSpecies,
//   (req, res) => res.status(200).json(res.locals.species)
// );

// router.get('/homeworld',
//   starWarsController.getHomeworld,
//   (req, res) => res.status(200).json(res.locals.homeworld)
// );

// router.get('/film',
//   starWarsController.getFilm,
//   (req, res) => res.status(200).json({})
// );

// router.post('/character',
//   starWarsController.addCharacter,
//   (req, res) => res.status(200).json({})
// );

module.exports = router;