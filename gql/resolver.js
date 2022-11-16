const empreSas = require('../models/Empresas')
const resolver = {
  Query: {
    login: () => console.log('usuario'),
    listEmp:()=>empreSas.getEmp(),
    
  },
  Mutation: {
    intoUser: (_, { input }) => console.log(input),
    saveEmp:(_,{input})=>empreSas.saveEmp(input),
    delEmp:(_,{input})=>empreSas.delEmp(input),
    
  },
}

module.exports = resolver
