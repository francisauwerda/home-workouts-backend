const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  title: { type: String },
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'workout'
  }
});

mongoose.model('exercise', ExerciseSchema);
