const { addExericseToWorkout } = require('../requestHandlers/workout');



const createExercise = async (title, imagePath, workoutId) => {
  // 1. Upload image and get url
  const imageUrl = `http://blabla/${imagePath}`
  
  // 2. Add exercise to workout in DB
  const workout = await addExericseToWorkout({ title }, workoutId)

  console.log(`\n'${title}' added to '${workoutId}'\n`)
  return workoutId;
}

module.exports = createExercise;
