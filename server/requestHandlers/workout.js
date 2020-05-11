const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const Exercise = mongoose.model('exercise');

const addWorkout = async ({ title }) => {
  const workout = await new Workout({ title }).save();

  return workout;
}

const addExericseToWorkout = async ({ title, imageUrl }, workoutId) => {
  const workout = await Workout.addExercise(workoutId, { title, imageUrl });

  return workout;
}

const deleteWorkout = async (id) => {
  return Promise.all([
    Exercise.deleteMany({ workout: id }),
    Workout.deleteOne({ _id: id })
  ])
}

const editWorkout = async (id, { title }) => {
  const workout = await Workout.findById(id);
  if (title) {
    workout.title = title;
  }

  return (await workout).save();
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
  editWorkout,
  deleteWorkoutsAndExercises
}
