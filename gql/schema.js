const { gql } = require('apollo-server')
//FORMAT DE FECHA 2021-01-01T03:53:00.000Z
const typeDefs = gql`
  type Query {
    empresasAll: [empresas]
    preguntas: [cat_preg]
  }
  type Mutation {
    empresaAd(input: inputemp): empresas
    empresaDel(input: inputId): [empresas]
    createEnc(input: inputencexist): [encexist]
    getExistenc(input: inputidN): [encexist]
  }

  type usuarios {
    id: ID
  }
  input inputusuario {
    nombre: String
  }
  input inputId {
    id: String
  }
  input inputidN {
    id: Int!
  }
  input inputemp {
    idemp: String
    empresa: String
  }

  input inputencexist {
    idemp: Int
    emp: String
    encno: Int
    fecin: String
    fecfin: String
  }

  type empresas {
    id: ID
    idemp: String
    empresa: String
    estado: String
    created_at: String
    updated_at: String
  }

  type cat_preg {
    id: ID
    pregunta: String
    tipo: String
    corr: String
    descrip: String
    createat: String
    created_at: String
    updated_at: String
  }
  type encexist {
    id: ID
    idemp: ID
    emp: String
    encno: Int
    estado: Int
    fecin: String
    fecfin: String
    created_at: String
    updated_at: String
  }
`

module.exports = typeDefs
