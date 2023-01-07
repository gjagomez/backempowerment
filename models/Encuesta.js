const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

async function getEncPreg() {
  const getEncuesta = await prisma.CAT_PREG.findMany()
  return getEncuesta
}

async function answerenc(input) {
  const jsonp = JSON.parse(input.json)
  const jsonEnc = jsonp.encuesta[0]
  const enc = await prisma.TRN_EMPRESP.createMany({
    data: jsonp.encuesta[0],
    skipDuplicates: false,
  })

  const codigoemp = jsonEnc[0].CODEMP
  const empresa = jsonEnc[0].EMP
  const encuestano = jsonEnc[0].ENCNO

  anserLibre(jsonp.comentario)
  answerNPS(jsonp.recomendaEmpresa)
  encreganswer(codigoemp, empresa, encuestano)
  const token = {
    mensaje: enc.count,
  }

  return token
}
async function answerNPS({ RESP, EMP, CODEMP, ENCNO }) {
  const reslibre = await prisma.SNP.createMany({
    data: {
      VALOR: parseInt(RESP),
      EMP: EMP,
      CODEMP: CODEMP,
      ENCNO: parseInt(ENCNO),
    },
  })
  return reslibre
}
async function anserLibre({ EMP, ENCNO, CODEMP, RESP }) {
  const reslibre = await prisma.TRN_LIBRE.createMany({
    data: {
      EMP: EMP,
      ENC: ENCNO,
      CODEMP: CODEMP,
      COMENTARIO: RESP,
    },
  })
  return reslibre
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
