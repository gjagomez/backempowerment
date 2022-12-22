const { gql } = require('apollo-server')
const { GraphQLDate, GraphQLDateTime } = require('graphql-iso-date')

const typeDefs = gql`
  scalar Date
  scalar DateTime

  type Query {
    empresasAll: [empresas]
  }
  type Mutation {
    empresaAd(input: inputemp): [empresas]
    empresaDel(input: inputID): [empresas]
    empresaallEnc(input: inputID): [encuestas]
    empresaAdEnc(input: inputEncuestas): [encuestas]
    empresaEmpAd(input: inputEmpAdd): mensaje
  }
  type mensaje {
    mensaje: String
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
  input inputEmpAdd {
    json: String!
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
`

module.exports = typeDefs
