const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json({workouts});
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if the ID a valid ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }

    // Find the workout
    const workout = await Workout.findById(id);

    // Handle workout doesnt exists
    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    }

    // Return workout if it exists
    res.status(200).json({workout});
}

// create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body;

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps});
        res.status(200).json({workout});
    } catch (error) {
        res.status(400).json({Error: error.message});
    }
}

// delete a workout


// update a workout

module.exports= {
    createWorkout, getWorkouts, getWorkout
}