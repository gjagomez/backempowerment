const mysql = require('mysql2/promise')

module.exports = () => {
  return mysql.createPool({
    host: '137.184.217.236',
    user: 'emp',
    password: 'Jagomez22*',
    database: 'empowerment',
    waitForConnections: true,
  })
}
