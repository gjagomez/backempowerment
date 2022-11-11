const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    login: [usuarios]
  }
  type Mutation {
    intoUser(input: inputusuario): usuarios
  }

  type usuarios {
    id: ID
  }
  input inputusuario {
    nombre: String
  }
`

module.exports = typeDefs
