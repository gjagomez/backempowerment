const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {

    empresasAll: [empresas]
  }
  type Mutation {
    empresaAd(input: inputemp): empresas
    empresaDel(input: inputId): [empresas]
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
  input inputemp {
    idemp: String
    empresa: String
  }
  type empresas {
    id: ID
    idemp: String
    empresa: String
    estado: String
    created_at: String
    updated_at: String
  }
`;

module.exports = typeDefs;
