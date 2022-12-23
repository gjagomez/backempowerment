const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

async function LoginAdmin({ email, clave }) {
  const Usuario = await prisma.US_ADMIN.findMany({
    where: {
      EMAIL: {
        equals: email, // Default value: default
      },
      CLAVE: {
        equals: clave, // Default mode
      },
    },
    select: {
      ID: true,
      EMAIL: true,
      NOMBRE: true,
      EMP: true,
    },
  })

  const token = {
    mensaje: jwt.sign(Usuario[0], 'ja&ka', { expiresIn: '1800s' }),
  }

  return token
}
async function CreateUser(input) {
  const addUseradmin = await prisma.US_ADMIN.create({
    data: input,
  })

  console.log(addUseradmin)
  const { empresa } = addUseradmin
  const ListUser = await prisma.US_ADMIN.findMany({
    where: {
      EMP: {
        equals: empresa, // Default value: default
      },
    },
  })
  return ListUser
}
async function ListUserAdmin({ id }) {
  const ListUser = await prisma.US_ADMIN.findMany({
    where: {
      EMP: {
        equals: id, // Default value: default
      },
    },
  })
  return ListUser
}

module.exports = {
  LoginAdmin,
  CreateUser,
  ListUserAdmin,
}
