const mysql2 = require("mysql2");

// const db = mysql2.createPool({
//     connectionLimit: 100,
//     host: "localhost",
//     user: "root",
//     "password": "",
//     database: "law"
// })

const db = mysql2.createPool({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

module.exports = db