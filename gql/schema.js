const { gql } = require('apollo-server')
const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date')

const typeDefs = gql`
  scalar Date
  scalar DateTime

  type Query {
    empresasAll: [empresas]
    encuesta: [encuesta]
  }
  type Mutation {
    empresaAd(input: inputemp): [empresas]
    empresaDel(input: inputID): [empresas]
    empresaallEnc(input: inputID): [encuestas]
    empresaAdEnc(input: inputEncuestas): [encuestas]
    empresaEmpAd(input: inputEmpAdd): mensaje
    empresaEmpleado(input: inputEmpleados): [empleados]
    empresaUpdateemp(input: inputEmpAdd): mensaje
    loginadmin(input: inputLogin): mensajeLogin
    empresaGetEmpleado(input: inputID): empleados
    encanswer(input: inputEmpAdd): mensaje
    encvalid(input: inputValid): [validEnc]
    menuNav(input: inputIDstring): mensaje
    emprefal(input: inputIDstring): [listEmp]
    encChartLine(input: inputParEnc): mensaje
    encChatTot(input: inputParEnc): mensaje
    encComent(input: inputCouch): mensaje
    punteoMP4(input: inputCouch): mensaje
    punteo(input: inputCouch): mensaje
  }
  type listEmp {
    CODEMP: ID
    NOMBRE: String
    EMAILEMP: String
    PUESTO: String
    NOMGE: String
  }
  type validEnc {
    ID: ID
    CODEMP: ID
    FEC: Date
    EMP: String
    ENCNO: Int
  }
  type encuesta {
    ID: ID
    PREGUNTA: String
    TIPO: String
    CORR: String
    DESCRIP: String
  }
  type mensaje {
    mensaje: String
  }
  type mensajeLogin {
    mensaje: String
    estado: Int
  }
  type encuestas {
    ID: ID
    EMP: String
    ENCNO: Int
    FECHA: Date
    STATUS: String
    FECIN: Date
    FECFIN: Date
  }

  type empresas {
    ID: ID
    EMPRESA: String
    STATUS: String
    LOGO: String
    CREATEAT: Date
    UPDATEAT: Date
  }

  type empleados {
    CODEMP: String
    NOMBRE: String
    PUESTO: String
    CODGE: String
    NOMGE: String
    PUESTOGE: String
    EMPRESA: String
    EMAILEMP: String
    EMAILJEF: String
    ROL: String
    REGION: String
    DEPARTAMENT: String
    ID: ID
    ENCNO: String
    SUCURSAL: String
    ANTIGUEDAD: String
  }
  type login {
    ID: ID
    EMAIL: String
    CLAVE: String
    NOMBRE: String
    EMP: String
  }
  input inputValid {
    codemp: Int
    encno: Int
    emp: String
  }
  input inputLogin {
    email: String
    clave: String
  }
  input inputEmpAdd {
    json: String!
  }
  input inputEmpleados {
    EMP: String
    ENC: ID!
  }
  input inputEncuestas {
    EMP: String
    ENCNO: Int
    FECHA: String
    STATUS: String
    FECIN: Date
    FECFIN: Date
  }
  input inputemp {
    EMPRESA: String!
  }

  input inputID {
    ID: ID
  }
  input inputIDstring {
    ID: String!
  }

  input inputParEnc {
    EMP: String!
    ENC: Int
  }

  input inputCouch {
    CODJE: String!
    ENC: Int
  }
`

module.exports = typeDefs
