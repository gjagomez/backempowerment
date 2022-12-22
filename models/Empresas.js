const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

async function getEmp() {
  const allEmpresas = await prisma.EMPRESA.findMany()
  return allEmpresas
}

async function saveEmp(input) {
  const enc = await prisma.EMPRESA.create({
    data: input,
  })
  return getEmp()
}

async function eliminaEmp({ ID }) {
  const deleteEmp = await prisma.EMPRESA.deleteMany({
    where: {
      ID: parseInt(ID),
    },
  })
  return getEmp()
}

async function getEncuesta({ ID }) {
  console.log(ID)
  const encexistente = await prisma.ENCEXIST.findMany({
    where: {
      EMP: ID,
    },
  })
  return encexistente
}

async function saveEnc(input) {
  const { EMP, ENCNO, FECHA, FECIN, FECFIN } = input
  const createenc = await prisma.ENCEXIST.create({
    data: {
      EMP: EMP,
      ENCNO: ENCNO,
      FECHA: new Date(FECHA),
      FECFIN: new Date(FECIN),
      FECFIN: new Date(FECFIN),
    },
  })
  const encexistente = await prisma.ENCEXIST.findMany({
    where: {
      EMP: createenc.EMP,
    },
  })
  return encexistente
}

async function createEmpleado(input) {
  const jsonp = JSON.parse(input.json)
  const enc = await prisma.CATEMP.createMany({
    data: jsonp,
    skipDuplicates: false,
  })
  const resp = { mensaje: enc.count }
  return resp
}

module.exports = {
  saveEmp,
  eliminaEmp,
  getEmp,
  createEmpleado,
  getEncuesta,
  saveEnc,
}
