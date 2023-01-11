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

async function personasFaltante({ ID }) {
  const res = await prisma.$queryRaw`SELECT C.CODEMP
                                    ,C.NOMBRE 
                                    ,C.EMAILEMP 
                                    ,C.PUESTO 
                                    ,C.NOMGE 
                              FROM CATEMP C 
                              LEFT JOIN TRNENCONT T
                              ON C.CODEMP =T.CODEMP 
                              AND C.ENCNO =T.ENCNO 
                              AND C.EMPRESA =T.EMP 
                              WHERE T.FEC IS NULL
                              AND C.EMPRESA =${ID}`

  return res
}
async function chartTotal({ EMP, ENC }) {
  const res = await prisma.$queryRaw`SELECT COUNT(DISTINCT CODEMP) AS TOTALEMPLEADO
                            ,E.CONTESTADO
                            FROM CATEMP C
                            LEFT JOIN(SELECT COUNT(DISTINCT CODEMP) AS CONTESTADO 
                                            ,T.EMP 
                                            ,T.ENCNO 
                                  FROM TRNENCONT T
                                  WHERE T.EMP =${EMP}
                                  AND T.ENCNO =${ENC}
                                  GROUP BY T.EMP,T.ENCNO 
                                  ) E
                            ON  C.EMPRESA =E.EMP
                            AND C.ENCNO =E.ENCNO
                            WHERE C.EMPRESA =${EMP}
                            AND C.ENCNO  =${ENC}`

  const ob = {
    totEmp: parseInt(res[0].TOTALEMPLEADO),
    totResp: parseInt(res[0].CONTESTADO),
  }
  const objeto = {
    mensaje: JSON.stringify(ob),
  }
  return objeto
}
async function chatsLine({ EMP, ENC }) {
  const Series = []
  const resTotemp = await prisma.$queryRaw`SELECT COUNT(DISTINCT C.CODEMP) AS TOTEMP
                                          ,PUESTO 
                                    FROM CATEMP C
                                    WHERE EMPRESA =${EMP}
                                    AND ENCNO =${ENC}
                                    GROUP BY C.PUESTO `
  const totEmp = resTotemp.map((item, index) => {
    return parseInt(item.TOTEMP)
  })
  const dataLabel = resTotemp.map((item, index) => {
    return item.PUESTO
  })
  const resTotCont = await prisma.$queryRaw`SELECT COUNT(DISTINCT T.CODEMP) AS CONT
                                                    ,C.PUESTO 
                                              FROM TRNENCONT T
                                              INNER JOIN CATEMP C 
                                              ON T.EMP =C.EMPRESA 
                                              AND T.ENCNO =C.ENCNO 
                                              AND T.CODEMP =C.CODEMP 
                                              WHERE T.EMP =${EMP}
                                              AND T.ENCNO =${ENC}
                                              GROUP BY C.PUESTO `

  const totCont = resTotCont.map((item) => {
    return parseInt(item.CONT)
  })
  const obj = {
    name: 'Contestadas',
    type: 'column',
    data: totCont,
  }
  const objP = {
    name: 'Pendientes',
    type: 'line',
    data: totEmp,
  }
  Series.push({ Contestada: obj })
  Series.push({ Pendientes: objP })
  Series.push({ dataLabel: dataLabel })
  const objeto = {
    mensaje: JSON.stringify(Series),
  }
  return objeto
}
module.exports = {
  getEncPreg,
  answerenc,
  validEnc,
  personasFaltante,
  chartTotal,
  chatsLine,
}
