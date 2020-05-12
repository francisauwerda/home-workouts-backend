const { connectToDb, disconnectFromDb } = require('../db');

const createWorkout = require('./createWorkout');
const createExercise = require('./createExercise');

const fakeData = {
  workoutName: 'Nelis workout',
  exercises: [{
    exerciseName: 'Dips2',
    // imagePath: 'images/dips.jpg',
    // order: 1
  }
  // ,{
  //   exerciseName: 'Jumping squats',
  //   imagePath: 'images/dips.jpg',
  //   order: 3
  // }
  // ,{
  //   exerciseName: 'No image',
  //   // imagePath: 'images/dips.jpg',
  //   // order: 3
  // }
]
}

const bulkAddWorkoutAndExercises = async (data) => {
  const { workoutName, exercises } = data;

  const workoutId = await createWorkout(workoutName);

  let workoutIds = await Promise.all(
    exercises.map(async exercise => {
      const { exerciseName, imagePath, order } = exercise;
      const id = await createExercise(exerciseName, imagePath, order, workoutId)
      return id;
    })
  )

  return workoutIds;
}

(async () => {
  connectToDb();
  const result = await bulkAddWorkoutAndExercises(fakeData);
  disconnectFromDb();
})();