const empreSas = require('../models/Empresas')
const resolver = {
  Query: {
    empresasAll:()=>empreSas.getEmp(),
    
  },
  Mutation: {
    empresaAd:(_,{input})=>empreSas.saveEmp(input),
    empresaDel:(_,{input})=>empreSas.delEmp(input),
    
  },
}

module.exports = resolver
