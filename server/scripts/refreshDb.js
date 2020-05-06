const { connectToDb, disconnectFromDb } = require('../db');
connectToDb();

const { deleteWorkoutsAndExercises } = require('../requestHandlers/workout');

(async () => {
  console.log(`\n---\n Comment out this line if you are sure \n---\n`);
  // await deleteWorkoutsAndExercises();
  disconnectFromDb();
})();