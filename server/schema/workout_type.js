const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const ExerciseType = require('./exercise_type');
const Workout = mongoose.model('workout');

const WorkoutType = new GraphQLObjectType({
  name: 'WorkoutType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve(parentValue) {
        return Workout.findExercises(parentValue.id);
      }
    }
  })
});

module.exports = WorkoutType;
