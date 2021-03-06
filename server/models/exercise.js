const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  title: { type: String },
  imageUrl: { type: String },
  order: { type: Number, default: 0 },
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'workout'
  }
});

mongoose.model('exercise', ExerciseSchema);
