const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
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
    }
  }
});

module.exports = mutation;
