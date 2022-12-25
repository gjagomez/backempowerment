const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

async function LoginAdmin({ email, clave }) {
  try {
    const Usuario = await prisma.US_ADMIN.findMany({
      where: {
        EMAIL: {
          equals: email, // Default value: default
        },
        CLAVE: {
          equals: clave, // Default mode
        },
      },
      select: {
        ID: true,
        EMAIL: true,
        NOMBRE: true,
        EMP: true,
      },
    })

    const token = {
      mensaje: jwt.sign(Usuario[0], 'empowerment', { expiresIn: '1800s' }),
    }

    return token
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // console.log(e.code)
      // if (e.code === 'P2002') {
      //   console.log(
      //     'There is a unique constraint violation, a new user cannot be created with this email',
      //   )
      // }
    }
    throw e
  }
}
async function CreateUser(input) {
  const addUseradmin = await prisma.US_ADMIN.create({
    data: input,
  })

  const { empresa } = addUseradmin
  const ListUser = await prisma.US_ADMIN.findMany({
    where: {
      EMP: {
        equals: empresa, // Default value: default
      },
    },
  })
  return ListUser
}
async function ListUserAdmin({ id }) {
  const ListUser = await prisma.US_ADMIN.findMany({
    where: {
      EMP: {
        equals: id, // Default value: default
      },
    },
  })
  return ListUser
}

module.exports = {
  LoginAdmin,
  CreateUser,
  ListUserAdmin,
}
