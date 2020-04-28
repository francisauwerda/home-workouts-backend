const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Exercise = mongoose.model('exercise');

const ExerciseType = new GraphQLObjectType({
  name: 'ExerciseType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    workout: {
      // TODO: Find out why I can't require this from the top
      type: require('./workout_type'),
      resolve(parentValue) {
        return Exercise
          .findById(parentValue) // I don't know why it isn't parentValue.id
          .populate('workout')
          .then(exercise => {
            return exercise.workout
          });
      }
    }
  })
})

module.exports = ExerciseType;
