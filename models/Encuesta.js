const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

async function getPreguntas() {
  const allPreg = await prisma.cat_preg.findMany()
  return allPreg
}
async function createEnc(input) {
  const { idemp, emp, encno, fecin, fecfin } = input

  const enc = await prisma.encexist.create({
    data: {
      idemp: idemp,
      emp: emp,
      encno: encno,
      fecin: new Date(fecin),
      fecfin: new Date(fecfin),
    },
  })

  const { idempre } = enc
  const getEncExist = await prisma.encexist.findMany({
    where: {
      idemp: idempre,
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
