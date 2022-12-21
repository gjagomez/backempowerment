const empreSas = require('../models/Empresas')
const Encuesta = require('../models/Encuesta')
const LoginEmp = require('../models/Loginempresas')
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
    loginAdmin: (_, { input }) => LoginEmp.LoginAdmin(input),

    empresaEmpAd: (_, { input }) => empreSas.createEmpleado(input),

    createAdmin: (_, { input }) => LoginEmp.CreateUser(input),
    empadminList: (_, { input }) => LoginEmp.ListUserAdmin(input),
  },
}

module.exports = resolver
