const resolver = {
  Query: {
    login: () => console.log('usuario'),
  },
  Mutation: {
    intoUser: (_, { input }) => console.log(input),
  },
}

module.exports = resolver
