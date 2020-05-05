
const createWorkout = (workoutName) => {
  const workoutId = 'w1';
  console.log(`\nWorkout '${workoutName}' added with ID: ${workoutId}\n`)
  return workoutId;
}

module.exports = createWorkout;