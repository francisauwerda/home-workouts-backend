const { connectToDb, disconnectFromDb } = require('../db');
connectToDb();

const createWorkout = require('./createWorkout');
const createExercise = require('./createExercise');

const fakeData = {
  workoutName: 'Workout A',
  exercises: [{
    exerciseName: 'Lunges',
    imagePath: '/images/dips.jpg'
  }, {
    exerciseName: 'Jumping squats',
    imagePath: '/images/dips.jpg'
  }]
}

// rtewtij43otwj-dips.jpg

const bulkAddWorkoutAndExercises = async (data) => {
  const { workoutName, exercises } = data;

  const workoutId = await createWorkout(workoutName);

  let workoutIds = await Promise.all(
    exercises.map(async exercise => {
      const { exerciseName, imagePath } = exercise;
      const id = await createExercise(exerciseName, imagePath, workoutId)
      return id;
    })
  )

  return workoutIds;
}

(async () => {
  const result = await bulkAddWorkoutAndExercises(fakeData);
  console.log(`\n---\n Finished. Time to disconnect \n---\n`);
  disconnectFromDb();
})();