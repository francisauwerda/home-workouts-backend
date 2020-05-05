const mongoose = require('mongoose');
const Exercise = mongoose.model('exercise');

const deleteExercise = async = (id) => {
  return Exercise.deleteOne({ _id: id })
}

module.exports = {
  deleteExercise
}
