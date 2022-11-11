const empreSas = require('../models/Empresas')
const resolver = {
  Query: {
    login: () => console.log('usuario'),
  },
  Mutation: {
    intoUser: (_, { input }) => console.log(input),
    saveEmp:(_,{input})=>empreSas.saveEmp(input),
  },
}

module.exports = resolver
