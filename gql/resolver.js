const empreSas = require('../models/Empresas')
const Encuesta = require('../models/Encuesta')
const resolver = {
  Query: {
    empresasAll: () => empreSas.getEmp(),
    preguntas: () => Encuesta.getPreguntas(),
  },
  Mutation: {
    empresaAd: (_, { input }) => empreSas.saveEmp(input),
    empresaDel: (_, { input }) => empreSas.delEmp(input),
    createEnc: (_, { input }) => Encuesta.createEnc(input),
    getExistenc: (_, { input }) => Encuesta.getEnc(input),
  },
}

module.exports = resolver
