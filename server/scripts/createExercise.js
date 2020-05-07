const { uuid } = require('uuidv4');
const { addExericseToWorkout } = require('../requestHandlers/workout');
const { uploadFile } = require('../../storage');

/**
 * Converts `/images/Dips.jpg` to `fsde-2df3-fd2e-tth3-dips`
 * @param {string} filePath
 */
const getFileKey = (filePath) => {
  const splitBySlash = filePath.split('/');
  const fileNameWithExtension = splitBySlash[splitBySlash.length - 1];
  // const splitForExtension = fileNameWithExtension.split('.');
  // const fileName = splitForExtension[0];
  
  return `${uuid()}-${fileNameWithExtension}`;
}

const createExercise = async (title, filePath, workoutId) => {
  // 1. Upload image and get url
  const fileKey = getFileKey(filePath);
  const imageUrl = await uploadFile(filePath, fileKey);
  
  // 2. Add exercise to workout in DB
  const workout = await addExericseToWorkout({ title, imageUrl }, workoutId)

  console.log(`\n'${title}' added to '${workout.title}'\n`)
  return workoutId;
}

module.exports = createExercise;
