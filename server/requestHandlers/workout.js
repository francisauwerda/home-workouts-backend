const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const Exercise = mongoose.model('exercise');

const addWorkout = async ({ title }) => {
  const workout = await new Workout({ title }).save();

  return workout;
}

const addExericseToWorkout = async ({ title }, workoutId) => {
  const workout = await Workout.addExercise(workoutId, title);

  return workout;
}

const deleteWorkout = async (id) => {
  return Promise.all([
    Exercise.deleteMany({ workout: id }),
    Workout.deleteOne({ _id: id })
  ])
}

const deleteWorkoutsAndExercises = async () => {
  return Promise.all([
    Exercise.deleteMany({}),
    Workout.deleteMany({})
  ])
}

module.exports = {
  addWorkout,
  addExericseToWorkout,
  deleteWorkout,
  deleteWorkoutsAndExercises
}
