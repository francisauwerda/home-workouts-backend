const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  title: { type: String },
});

mongoose.model('workout', WorkoutSchema);
