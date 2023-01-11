const { PrismaClient } = require('@prisma/client')
prisma = new PrismaClient()

async function getComentario({ CODJE, ENC }) {
  const responseComent = await prisma.$queryRaw`SELECT L.ID
       ,L.COMENTARIO 
FROM TRN_LIBRE L
INNER JOIN CATEMP C 
ON  L.EMP =C.EMPRESA 
AND L.ENC =C.ENCNO 
AND L.CODEMP =C.CODEMP 
WHERE C.CODGE =${CODJE}
AND C.ENCNO =${ENC}`

  const objeto = {
    mensaje: JSON.stringify(responseComent),
  }
  return objeto
}
module.exports = {
  getComentario,
}
