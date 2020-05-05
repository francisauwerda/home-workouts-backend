const createWorkout = require('./createWorkout');
const addExerciseToWorkout = require('./addExerciseToWorkout');

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

const bulkAddWorkoutAndExercises = (data) => {
  const workoutId = createWorkout(data.workoutName);

  data.exercises.forEach(exercise => {
    const { exerciseName, imagePath } = exercise;
    addExerciseToWorkout(exerciseName, imagePath, workoutId)
  })
}

bulkAddWorkoutAndExercises(fakeData);
