const empreSas = require('../models/Empresas')
const Encuesta = require('../models/Encuesta')
const LoginEmp = require('../models/Loginempresas')
const Comentarios = require('../models/EncuestaCom')
const Punteos = require('../models/EncuestaPunteo')
const resolver = {
  Query: {
    empresasAll: () => empreSas.getEmp(),
    encuesta: () => Encuesta.getEncPreg(),
  },
  Mutation: {
    empresaAd: (_, { input }) => empreSas.saveEmp(input),
    empresaDel: (_, { input }) => empreSas.eliminaEmp(input),
    empresaallEnc: (_, { input }) => empreSas.getEncuesta(input),
    empresaAdEnc: (_, { input }) => empreSas.saveEnc(input),
    empresaEmpAd: (_, { input }) => empreSas.createEmpleado(input),
    empresaEmpleado: (_, { input }) => empreSas.getEmpleados(input),
    empresaUpdateemp: (_, { input }) => empreSas.updateEmpleado(input),
    loginadmin: (_, { input }) => LoginEmp.LoginAdmin(input),
    empresaGetEmpleado: (_, { input }) => empreSas.getDatosEmpleados(input),
    encanswer: (_, { input }) => Encuesta.answerenc(input),
    encvalid: (_, { input }) => Encuesta.validEnc(input),
    menuNav: (_, { input }) => LoginEmp.menuNav(input),
    emprefal: (_, { input }) => Encuesta.personasFaltante(input),
    encChartLine: (_, { input }) => Encuesta.chatsLine(input),
    encChatTot: (_, { input }) => Encuesta.chartTotal(input),
    encComent: (_, { input }) => Comentarios.getComentario(input),
    punteoMP4: (_, { input }) => Punteos.getPunteoMP4(input),
    punteo: (_, { input }) => Punteos.getPunteo(input),
  },
}

module.exports = resolver
