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
    loginAdmin(input: inputLogin): [login]
    empresaEmpAd(input: inputEmpAdd): mensaje
    createAdmin(input: inputAdminSave): [login]
    empadminList(input: inputId): [login]
  }

  type usuarios {
    id: ID
  }
  input inputusuario {
    nombre: String
  }
  input inputId {
    id: String!
  }
  input inputidN {
    id: Int!
  }
  input inputemp {
    idemp: String!
    empresa: String!
  }

  input inputencexist {
    idemp: Int
    emp: String
    encno: Int
    fecin: String
    fecfin: String
  }
  input inputLogin {
    email: String
    clave: String
  }
  input inputCreaAd {
    idemp: Int
    codemp: Int
    email: String
    clave: String
    estado: Int
    rol: String
  }

  input inputEmpAdd {
    json: String!
  }
  input inputAdminSave {
    idemp: String
    empresa: String
    email: String
    nombre: String
    clave: String
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
  type mensaje {
    mensaje: String
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
  type login {
    id: Int
    idemp: String
    empresa: String
    email: String
    nombre: String
    clave: String
    created_at: String
    updated_at: String
  }
`

module.exports = typeDefs
