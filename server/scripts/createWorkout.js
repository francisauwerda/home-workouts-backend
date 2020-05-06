const { addWorkout } = require('../requestHandlers/workout');

const createWorkout = async (title) => {
  const workout = await addWorkout({ title });
  console.log(`\nWorkout '${workout.title}' added with ID: ${workout.id}\n`)
  return workout.id;
}

module.exports = createWorkout;