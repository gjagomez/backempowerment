const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function LoginAdmin({ email, clave }) {
  const Usuario = await prisma.usadmin.findMany({
    where: {
      email: {
        equals: email, // Default value: default
      },
      clave: {
        equals: clave, // Default mode
      },
    },
  })
  return Usuario
}
async function CreateUser(input) {
  const addUseradmin = await prisma.usadmin.create({
    data: input,
  })
}
async function ListUserAdmin({ idemp }) {
  const ListUser = await prisma.usadmin.findMany({
    where: {
      codemp: {
        equals: idemp, // Default value: default
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
