const { PrismaClient, cat_preg, encexist } = require('@prisma/client')
prisma = new PrismaClient()

async function getPreguntas() {
  const allPreg = await prisma.cat_preg.findMany()
  return allPreg
}
async function createEnc(input) {
  const enc = await prisma.encexist.create({
    data: input,
  })
  const { idemp } = enc
  const getEncExist = await prisma.encexist.findMany({
    where: {
      idemp: idemp,
    },
  })
  return getEncExist
}
async function getEnc({ id }) {
  const getEncExist = await prisma.encexist.findMany({
    where: {
      idemp: id,
    },
  })
  return getEncExist
}
module.exports = {
  getPreguntas,
  createEnc,
  getEnc,
}
