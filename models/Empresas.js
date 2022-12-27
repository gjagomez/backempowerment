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

async function getEmpleados(input) {
  const { EMP, ENC } = input

  const getEmpleados = await prisma.CATEMP.findMany({
    where: {
      EMPRESA: {
        equals: EMP, // Default value: default
      },
      ENCNO: {
        equals: parseInt(ENC), // Default mode
      },
    },
  })
  return getEmpleados
}
async function updateEmpleado(input) {
  const {
    ID,
    CODEMP,
    NOMBRE,
    PUESTO,
    CODGE,
    NOMGE,
    PUESTOGE,
    EMPRESA,
    EMAILEMP,
    EMAILJEF,
    ROL,
    REGION,
    DEPARTAMENT,
    ENCNO,
    SUCURSAL,
    ANTIGUEDAD,
  } = JSON.parse(input.json)
  const updateUsers = await prisma.CATEMP.updateMany({
    where: {
      ID: {
        equals: ID,
      },
    },
    data: {
      CODEMP: CODEMP,
      NOMBRE: NOMBRE,
      PUESTO: PUESTO,
      CODGE: CODGE,
      CODGE: CODGE,
      PUESTOGE: PUESTOGE,
      NOMGE: NOMGE,
      EMAILEMP: EMAILEMP,
      EMAILJEF: EMAILJEF,
      REGION: REGION,
      DEPARTAMENT: DEPARTAMENT,
      ENCNO: ENCNO,
      SUCURSAL: SUCURSAL,
      ANTIGUEDAD: ANTIGUEDAD,
    },
  })
  const resp = { mensaje: updateUsers.count }
  return resp
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
async function getDatosEmpleados(input) {
  const getEmpleados = await prisma.CATEMP.findMany({
    where: {
      ID: {
        equals: parseInt(input.ID), // Default value: default
      },
    },
  })

  return getEmpleados[0]
}
module.exports = {
  saveEmp,
  eliminaEmp,
  getEmp,
  createEmpleado,
  getEncuesta,
  saveEnc,
  getEmpleados,
  updateEmpleado,
  getDatosEmpleados,
}
