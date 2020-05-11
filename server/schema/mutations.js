const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Workout = mongoose.model('workout');
const Exercise = mongoose.model('exercise');
const WorkoutType = require('./workout_type');
const ExerciseType = require('./exercise_type');
const {
  addWorkout,
  addExericseToWorkout,
  deleteWorkout
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
        workoutId: { type: GraphQLID }
      },
      resolve(parentValue, { title, imageUrl, workoutId }) {
        return addExericseToWorkout({ title, imageUrl }, workoutId);
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
      },
      resolve(parentValue, {
        id, title, imageUrl
      }) {
        return editExercise(id, { title, imageUrl });
      }
    }
  }
});

module.exports = mutation;
