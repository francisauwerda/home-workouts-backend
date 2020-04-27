const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const WorkoutType = require('./workout_type');
const Workout = mongoose.model('workout');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    workouts: {
      type: new GraphQLList(WorkoutType),
      resolve() {
        return Workout.find({});
      }
    }
  })
});

module.exports = RootQuery;
