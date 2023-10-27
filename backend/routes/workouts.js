const express = require('express');
const { createWorkout, getWorkouts, getWorkout } = require('../controllers/workoutController');

const router = express.Router();

// GET all workouts
router.get('/', getWorkouts);

// GET a single workoput
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a new workout
router.delete('/:id', (req, res) =>{
    res.json({message: 'DELETE a new workout'});
});

// UPDATE a new workout
router.patch('/:id', (req, res) =>{
    res.json({message: 'PATCH (update) a new workout'});
});

module.exports = router;