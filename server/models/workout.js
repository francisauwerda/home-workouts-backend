const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  title: { type: String },
  exercises: [{
    type: Schema.Types.ObjectId,
    ref: 'exercise'
  }]
});

// TODO: Change to async/await
WorkoutSchema.statics.addExercise = function (id, { title, imageUrl, order }) {
  const Exercise = mongoose.model('exercise');

  return this.findById(id)
    .then(workout => {
      const exercise = new Exercise({
        title,
        imageUrl,
        order,
        workout
      })

      workout.exercises.push(exercise);

      return Promise
        .all([
          exercise.save(),
          workout.save()
        ])
        .then(([exercise, workout]) => workout)
    })
}

WorkoutSchema.statics.findExercises = function (id) {
  return this.findById(id)
    .populate('exercises')
    .then(workout => workout.exercises);
}

mongoose.model('workout', WorkoutSchema);
