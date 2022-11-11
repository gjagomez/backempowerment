const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    login: [usuarios]
    listEmp:[empresas]
  }
  type Mutation {
    intoUser(input: inputusuario): usuarios
    saveEmp(input:inputemp):empresas
  }

  type usuarios {
    id: ID
  }
  input inputusuario {
    nombre: String
  }

  input inputemp{
    idemp:String
    empresa:String
  }
  type empresas{
    id:ID
     idemp:String 
     empresa:String 
     estado:String 
     created_at:String 
     updated_at:String
  }

`

module.exports = typeDefs
