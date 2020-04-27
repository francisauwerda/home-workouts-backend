const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const WorkoutType = new GraphQLObjectType({
  name: 'WorkoutType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
  })
});

module.exports = WorkoutType;
