const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    empresasAll: [empresas]
  }
  type Mutation {
    empresaAd(input: inputemp): [empresas]
  }

  type empresas {
    id: ID
    idemp: String
    empresa: String
    estado: String
    created_at: String
    updated_at: String
  }

  input inputemp {
    idemp: String!
    empresa: String!
  }
`
