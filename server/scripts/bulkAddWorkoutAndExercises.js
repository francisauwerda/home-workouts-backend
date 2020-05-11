const { connectToDb, disconnectFromDb } = require('../db');

const createWorkout = require('./createWorkout');
const createExercise = require('./createExercise');

const fakeData = {
  workoutName: 'Nelis workout',
  exercises: [{
    exerciseName: 'Dips',
    imagePath: 'images/dips.jpg'
  }
  ,{
    exerciseName: 'Jumping squats',
    imagePath: 'images/dips.jpg'
  }
]
}

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
  connectToDb();
  const result = await bulkAddWorkoutAndExercises(fakeData);
  disconnectFromDb();
})();