const { makeExecutableSchema } = require('graphql-tools');
const User = require('./types/User');
const resolvers = require('../resolvers');

const rootTypes = `
type Query {
  user: User
}
`;

module.exports = makeExecutableSchema({
  typeDefs: [rootTypes, User],
  resolvers
});
