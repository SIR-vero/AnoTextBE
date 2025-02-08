const { pool } = require('../database.js');

const findUserByUserName = async (userName) => {
    const [rows] = await pool.query(`SELECT username, userId FROM users WHERE username = ?`, [userName]);
    return rows[0];
}

const findUserByUserId = async (userId) => {
    const [rows] = await pool.query(`SELECT username FROM users WHERE userId = ?`, [userId]);
    return rows[0];
}

const getUserSaltedPassByUserName = async (userName) => {
    const [rows] = await pool.query(`SELECT saltedPassword FROM users WHERE username = ?`, [userName]);
    return rows[0]?.saltedPassword;
}


const getUserRolesByUserName = async (userName) => {
    const [rows] = await pool.query(`SELECT roles FROM users WHERE username = ?`, [userName]);
    return rows[0]?.roles;
}


const getUserByRefreshToken = async (refreshToken) => {
    const [rows] = await pool.query(`SELECT username FROM users WHERE refreshToken = ?`, [refreshToken]);
    return rows[0]?.username;
}

const addNewUserToDB = async (userObj) => {
    const username = userObj.username;
    const saltedPassword = userObj.password;
    const roles = Object.keys(userObj.roles).map(role => role.toUpperCase()).join()
    const uuId = userObj.userId

    if (username && saltedPassword) {
        const [result] = await pool.query(`INSERT INTO users 
            (username, roles, saltedPassword, userId) 
            VALUES 
            (?, ?, ?, ?)`, 
            [username, roles || 'USER', saltedPassword, uuId]);
        return result;
    }
}

const updateRefreshTokenByUserName = async (userName, refreshToken) => {
    if (userName){
        const [result] = await pool.query(`UPDATE users SET refreshToken = ? WHERE username = ?`, [refreshToken, userName]);
        console.log('queryResult', result)
        return result?.affectedRows;
    }
}

//updateRefreshTokenByUserName("testAyush", "testToken");

module.exports = { findUserByUserName, addNewUserToDB, getUserSaltedPassByUserName, getUserRolesByUserName, updateRefreshTokenByUserName, getUserByRefreshToken, findUserByUserId}

/* const test = findUserByUserName('Bindu');
test.then(res => console.log(res)); */