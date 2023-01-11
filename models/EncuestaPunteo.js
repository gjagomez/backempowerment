const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

async function getPunteoMP4({ CODJE, ENC }) {
  const resp = await prisma.$queryRaw`CALL empowerment.RESULTADOS(${CODJE},${ENC})`

  const objeto = {
    mensaje: JSON.stringify({ mp4: resp[0].f0 }),
  }
  return objeto
}

async function getPunteo({ CODJE, ENC }) {
  const resp = await prisma.$queryRaw`CALL empowerment.RESDETALLE(${CODJE},${ENC})`

  const dataDash = resp.map((item, index) => {
    obj = {
      name: item.f0,
      Resultado: item.f1,
    }
    return obj
  })
  const objeto = {
    mensaje: JSON.stringify({ dataDash: dataDash }),
  }
  return objeto
}

module.exports = {
  getPunteoMP4,
  getPunteo,
}
