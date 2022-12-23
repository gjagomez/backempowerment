const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

async function getEncPreg() {
  const getEncuesta = await prisma.CAT_PREG.findMany()
  return getEncuesta
}

module.exports = {
  getEncPreg,
}
