const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

async function getEncPreg() {
  const getEncuesta = await prisma.CAT_PREG.findMany()
  return getEncuesta
}

async function answerenc(input) {
  const jsonp = JSON.parse(input.json)

  const enc = await prisma.TRN_EMPRESP.createMany({
    data: jsonp,
    skipDuplicates: false,
  })
  const codigoemp = jsonp[0].CODEMP
  const empresa = jsonp[0].EMP
  const encuestano = jsonp[0].ENCNO

  encreganswer(codigoemp, empresa, encuestano)
  const token = {
    mensaje: enc.count,
  }

  return token
}
async function encreganswer(codeemp, emp, encno) {
  const regEnc = await prisma.TRNENCONT.create({
    data: {
      CODEMP: parseInt(codeemp),
      FEC: new Date(),
      EMP: emp,
      ENCNO: parseInt(encno),
    },
  })
  return regEnc
}

async function validEnc({ codemp, encno, emp }) {
  const getEncuesta = await prisma.TRNENCONT.findMany({
    where: {
      CODEMP: {
        equals: parseInt(codemp), // Default value: default
      },
      EMP: {
        equals: emp, // Default mode
      },
      ENCNO: {
        equals: parseInt(encno), // Default mode
      },
    },
  })

  return getEncuesta
}

module.exports = {
  getEncPreg,
  answerenc,
  validEnc,
}
