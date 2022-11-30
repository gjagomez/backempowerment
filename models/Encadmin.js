const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

async function login({ email, clave }) {
  console.log(email)
  const allUsers = await prisma.us_admin.findMany()
  console.log(allUsers)
  return allUsers
}
module.exports = {
  login,
}
