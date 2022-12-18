const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

async function saveEmp(input) {
  const { idemp, empresa } = input

  if (
    idemp == undefined ||
    idemp == '' ||
    empresa == undefined ||
    empresa == ''
  ) {
    return {
      id: 0,
      idemp: 'Id empresa es obligatorio',
      empresa: 'Empresa es obligatorio',
      estado: 0,
      created_at: '',
      updated_at: '',
    }
  }
  const enc = await prisma.empresa.create({
    data: input,
  })
  return enc
}

async function delEmp({ id }) {
  if (id == undefined || id == '') {
    return [
      {
        id: 0,
        idemp: 'id debe ser obligatorio',
        empresa: '',
        estado: 0,
        created_at: '',
        updated_at: '',
      },
    ]
  }
  const deleteEmp = await prisma.empresa.deleteMany({
    where: {
      idemp: id,
    },
  })
  const allUsers = await prisma.empresa.findMany()

  return allUsers
}
async function getEmp() {
  const allUsers = await prisma.empresa.findMany()
  return allUsers
}

async function createEmpleado(input) {
  const jsonp = JSON.parse(input.json)
  const enc = await prisma.catemp.createMany({
    data: jsonp,
    skipDuplicates: false,
  })
  const resp = { message: enc.count }
  return resp
}
async function createEnc({ empid, encno }) {}
async function endEnc({}) {}

module.exports = {
  saveEmp,
  delEmp,
  getEmp,
  createEnc,
  endEnc,
  createEmpleado,
}
