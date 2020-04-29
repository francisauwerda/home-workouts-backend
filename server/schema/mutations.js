const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const Exercise = mongoose.model('exercise');
const WorkoutType = require('./workout_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addWorkout: {
      type: WorkoutType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Workout({ title })).save()
      }
    },
    addExerciseToWorkout: {
      type: WorkoutType,
      args: {
        title: { type: GraphQLString },
        workoutId: { type: GraphQLID }
      },
      resolve(parentValue, { title, workoutId }) {
        return Workout.addExercise(workoutId, title);
      }
    },
    deleteWorkout: {
      type: WorkoutType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }) {
        return Promise.all([
          Exercise.deleteMany({ workout: id }),
          Workout.deleteOne({ _id: id })
        ])
      }
    }
  }
});

module.exports = mutation;
