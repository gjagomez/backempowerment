const empreSas = require('../models/Empresas')
const Encuesta = require('../models/Encuesta')
const LoginEmp = require('../models/Loginempresas')
const resolver = {
  Query: {
    empresasAll: () => empreSas.getEmp(),
  },
  Mutation: {
    empresaAd: (_, { input }) => empreSas.saveEmp(input),
    empresaDel: (_, { input }) => empreSas.eliminaEmp(input),
    empresaallEnc: (_, { input }) => empreSas.getEncuesta(input),
    empresaAdEnc: (_, { input }) => empreSas.saveEnc(input),
    empresaEmpAd: (_, { input }) => empreSas.createEmpleado(input),
  },
}

module.exports = resolver
