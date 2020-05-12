const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;
const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const Exercise = mongoose.model('exercise');
const WorkoutType = require('./workout_type');
const ExerciseType = require('./exercise_type');
const {
  addWorkout,
  addExericseToWorkout,
  deleteWorkout,
  editWorkout
} = require('../requestHandlers/workout');

const { deleteExercise, editExercise } = require('../requestHandlers/exercise');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addWorkout: {
      type: WorkoutType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return addWorkout({ title });
      }
    },
    addExerciseToWorkout: {
      type: WorkoutType,
      args: {
        title: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        order: { type: GraphQLInt },
        workoutId: { type: GraphQLID }
      },
      resolve(parentValue, { title, imageUrl, order, workoutId }) {
        return addExericseToWorkout({ title, imageUrl, order }, workoutId);
      }
    },
    deleteWorkout: {
      type: WorkoutType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }) {
        return deleteWorkout(id);
      }
    },
    editWorkout: {
      type: WorkoutType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString }
      },
      resolve(parentValue, { id, title }) {
        return editWorkout(id, { title })
      }
    },
    deleteExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parentValue, { id }) {
        return deleteExercise(id);
      }
    },
    editExercise: {
      type: ExerciseType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        imageUrl: { type: GraphQLString },
        order: { type: GraphQLInt },
      },
      resolve(parentValue, {
        id, title, imageUrl, order
      }) {
        return editExercise(id, { title, imageUrl, order });
      }
    }
  }
});

module.exports = mutation;
