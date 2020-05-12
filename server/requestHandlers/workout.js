const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const Exercise = mongoose.model('exercise');
const { deleteExercise } = require('./exercise');

const addWorkout = async ({ title }) => {
  const workout = await new Workout({ title }).save();

  return workout;
}

const addExericseToWorkout = async ({ title, imageUrl, order }, workoutId) => {
  const workout = await Workout.addExercise(workoutId, { title, imageUrl, order });

  return workout;
}

const deleteWorkout = async (id) => {
  const workout = await Workout.findById(id);
  const { exercises: exerciseIds } = workout;

  if (exerciseIds.length) {
    await Promise.all(exerciseIds.map(async id => {
      await deleteExercise(id);
    }));
  }

  return (await workout).remove();
}

const editWorkout = async (id, { title }) => {
  const workout = await Workout.findById(id);
  if (title) {
    workout.title = title;
  }

  return (await workout).save();
}

const deleteWorkoutsAndExercises = async () => {
  // TODO: Find all workout IDs and use deleteWorkout function above
  // return Promise.all([
  //   Exercise.deleteMany({}),
  //   Workout.deleteMany({})
  // ])
}

module.exports = {
  addWorkout,
  addExericseToWorkout,
  deleteWorkout,
  editWorkout,
  deleteWorkoutsAndExercises
}
