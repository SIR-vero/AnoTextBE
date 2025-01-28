const { pool } = require('../database.js');

const addNewMeesage = async (userName, message) => {
    if (userName && message) {
        const [result] = await pool.query(`INSERT INTO messages 
            (username, message_text) 
            VALUES 
            (?, ?)`, 
            [userName, message]);
        return result?.affectedRows;
    }
}

const getMessagesByUsername = async (userName) => {
    if(userName) {
        const [rows] = await pool.query(`SELECT * FROM messages WHERE username = ?`, [userName])
        return rows;
    }
}

module.exports = { addNewMeesage, getMessagesByUsername }