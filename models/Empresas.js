const conn = require('../config/server')
const pool = conn()
const { PrismaClient, empresa } = require('@prisma/client')
prisma = new PrismaClient()

async function saveEmp(input) {
  const enc = await prisma.empresa.create({
    data: input,
  })
  return enc
}

async function delEmp({ id }) {
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
async function createEnc({ empid, encno }) {}
async function endEnc({}) {}

module.exports = {
  saveEmp,
  delEmp,
  getEmp,
  createEnc,
  endEnc,
}
