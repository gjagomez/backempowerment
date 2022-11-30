const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

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
async function CreateUser(input) {}
module.exports = {
  LoginAdmin,
}
