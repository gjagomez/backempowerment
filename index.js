const { ApolloServer } = require('apollo-server')
const typeDefs = require('./gql/schema')
const resolvers = require('./gql/resolver')
const { MemcachedCache } = require('apollo-server-cache-memcached')
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '137.184.217.236',
  user: 'emp',
  password: 'Jagomez22*',
})

connection.connect(function (err) {
  if (err) {
    //console.error(`error de conextion: ${err.stack}`);
    console.log('*******************************************')
    console.log('*******ERRO DE CONEXION EN BASE DE DATOS EMPOWERMENT**')
    console.log('*******************************************')
    return
  }

  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,

    context: ({ req }) => {
      const token = req.headers.iduser

      if (token) {
        try {
          return {
            token,
          }
        } catch (error) {
          console.log('######### ERROR #########')
          console.log(error)
          throw new Error('Token invalido')
        }
      }
    },
    introspection: true,
    playground: true,

    persistedQueries: {
      cache: new MemcachedCache(
        ['memcached-1.local', 'memcached-2.local', 'memcached-3.local'],
        { retries: 10, retry: 10000 }, // Options
      ),
    },
  })

  serverApollo.listen().then(({ url }) => {
    console.log('*************************************')
    console.log(`Servidor listo en la URL ${url}`)
    console.log(`Conexion a la base de datos ${connection.threadId}`)

    console.log('*************************************')
  })
})
