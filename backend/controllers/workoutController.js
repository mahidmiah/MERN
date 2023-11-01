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

    console.log('[Debug]: ', req.body);

    const {title, load, reps} = req.body;

    // Handling empty fields
    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }

    if(emptyFields.length > 0){
        res.status(400).json({
            error: 'Please fill all required fields',
            emptyFields, 
        })
        return;
    }

    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps});
        res.status(200).json({workout});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if the ID a valid ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }

    // Try to find and delete one
    const workout = await Workout.findOneAndDelete({_id: id});

    // Handle workout doesnt exist so couldnt be deleteds
    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    }

    // Return workout if it exists and was deleted
    res.status(200).json(workout);
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if the ID a valid ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }

    // Try to find and upfate the workout
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body,
    });

    // Handle workout doesnt exist so couldnt be uupdated
    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    }

    // Return workout if it exists and was updated
    res.status(200).json(workout);
}

module.exports= {
    createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout
}