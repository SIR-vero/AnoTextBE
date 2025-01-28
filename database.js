const mysql = require('mysql2');
const dotenv = require('dotenv')

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

/* const findUserByUserName = async (userName) => {
    const [rows] = await pool.query(`SELECT username FROM users WHERE username = ?`, [userName]);
    return rows;
}

const test = findUserByUserName('admin');
test.then(res => console.log(res)); */

module.exports = { pool }