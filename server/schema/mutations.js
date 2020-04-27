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
    }
  }
});

module.exports = mutation;
