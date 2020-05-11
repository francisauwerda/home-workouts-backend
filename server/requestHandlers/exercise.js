const mongoose = require('mongoose');
const Exercise = mongoose.model('exercise');

const deleteExercise = async (id) => {
  return Exercise.deleteOne({ _id: id })
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
