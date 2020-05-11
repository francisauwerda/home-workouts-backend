const mongoose = require('mongoose');
const Exercise = mongoose.model('exercise');
const { deleteObject } = require('../../storage');

const getFileKey = (imageUrl) => {

  // https://example.s3.amazonaws.com/690f108a-7700-4911-9604-3a478cc39a27-dips.jpg

  const parts = imageUrl.split('/');
  const fileKey = parts[parts.length - 1];
  return fileKey;
}

const deleteExercise = async (id) => {
  const exercise = await Exercise.findById(id);
  if (!exercise) {
    return;
  }

  const { imageUrl } = exercise;
  const fileKey = getFileKey(imageUrl);

  // Try to delete the image from S3 bucket.
  // If it doesn't exist, it doesn't throw an error.
  await deleteObject(fileKey);
  return (await exercise).remove();
}

const editExercise = async (id, { title, imageUrl }) => {
  const exercise = await Exercise.findById(id);
  if (title) {
    exercise.title = title;
  }

  if (imageUrl) {
    exercise.imageUrl = imageUrl;
  }

  return (await exercise).save();
}

module.exports = {
  deleteExercise,
  editExercise
}
