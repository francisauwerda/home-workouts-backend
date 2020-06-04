const { connectToDb, disconnectFromDb } = require('../db');

const createWorkout = require('./createWorkout');
const createExercise = require('./createExercise');

const fakeData = {
  workoutName: 'Workout A',
  exercises: [{
    exerciseName: 'Alt. Single Leg Box Squats',
    imagePath: 'images/0.png',
    order: 1
  }
  ,{
    exerciseName: '1 1/2 Bottomed Out Squats',
    imagePath: 'images/1.png',
    order: 2
  }
  ,{
    exerciseName: 'Jump Squats',
    imagePath: 'images/2.png',
    order: 3
  }
  ,{
    exerciseName: 'Handstand Pushups/Power Pushaway',
    imagePath: 'images/3.png',
    order: 4
  }
  ,{
    exerciseName: 'Rotational Pushups',
    imagePath: 'images/4.png',
    order: 5
  }
  ,{
    exerciseName: 'Cobra Pushups',
    imagePath: 'images/5.png',
    order: 6
  }
  ,{
    exerciseName: 'Alt. Single Leg Heel Touch [Kickstand] Squats',
    imagePath: 'images/6.png',
    order: 7
  }
  ,{
    exerciseName: 'Alt. Sprinter Lunges',
    imagePath: 'images/7.png',
    order: 8
  }
  ,{
    exerciseName: 'Plyo Sprinter Lunges',
    imagePath: 'images/8.png',
    order: 9
  }
  ,{
    exerciseName: 'Pullups',
    imagePath: 'images/9.png',
    order: 10
  }
  ,{
    exerciseName: 'Human Pullovers/Sliding Pulldowns',
    imagePath: 'images/10.png',
    order: 11
  }
  ,{
    exerciseName: 'Inverted Chin Curls',
    imagePath: 'images/11.png',
    order: 12
  }
  ,{
    exerciseName: 'Reverse Corkscrews',
    imagePath: 'images/12.png',
    order: 13
  }
  ,{
    exerciseName: 'Black Widow Knee Slides',
    imagePath: 'images/13.png',
    order: 14
  }
  ,{
    exerciseName: 'Levitation Crunches',
    imagePath: 'images/14.png',
    order: 15
  }
  ,{
    exerciseName: 'Angels and Devils',
    imagePath: 'images/15.png',
    order: 16
  }
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