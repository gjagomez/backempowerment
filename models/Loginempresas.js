const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

async function LoginAdmin({ email, clave }) {
  try {
    const Usuario = await prisma.US_ADMIN.findMany({
      where: {
        EMAIL: {
          equals: email,
        },
        CLAVE: {
          equals: clave,
        },
      },
      select: {
        ID: true,
        EMAIL: true,
        NOMBRE: true,
        EMP: true,
        ROL: true,
      },
    })

    if (Usuario.length === 0) {
      const token = {
        mensaje: 'Usuario y contraseña incorrecto',
        estado: 1,
      }

      return token
    } else {
      const token = {
        mensaje: jwt.sign(Usuario[0], 'empowerment', { expiresIn: '1800s' }),
        estado: 0,
      }

      return token
    }
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

async function menuNav({ ID }) {
  const result = await prisma.NAVIGATION.findMany({
    where: {
      rol: {
        equals: ID,
      },
    },
  })

  const promises = result.map(async (x) => {
    const result = await prisma.CHILDREN.findMany({
      where: {
        children: {
          equals: x.option,
        },
        rol: {
          equals: x.rol,
        },
      },
      select: {
        header: true,
        iconName: true,
        link: true,
        index: true,
      },
    })
    const subMenu = {
      option: x.option,
      children: result,
    }
    return subMenu
  })

  const token = {
    mensaje: JSON.stringify(await Promise.all(promises)),
  }
  return token
}

module.exports = {
  LoginAdmin,
  CreateUser,
  ListUserAdmin,
  menuNav,
}
