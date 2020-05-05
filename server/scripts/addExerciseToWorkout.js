
const addExerciseToWorkout = (exerciseName, imagePath, workoutId) => {
  // 1. Upload image and get url
  const imageUrl = `http://blabla/${imagePath}`
  
  // 2. Add exercise to workout in DB

  console.log(`\n'${exerciseName}' added to '${workoutId}'\n`)
  return workoutId;
}

module.exports = addExerciseToWorkout;
