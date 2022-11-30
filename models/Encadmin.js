const { PrismaClient, us_admin } = require('@prisma/client')
prisma = new PrismaClient()


async function login({ email,clave }) {
    const getLogin = await prisma.us_admin.findMany({
        where: {
            email: email,
        },
    })
    console.log(getLogin)
    return getLogin
  }
  module.exports = {
    login,
  }
  