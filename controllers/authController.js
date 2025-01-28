/* const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
} */
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
require('dotenv').config();
/* const fsPromises = require('fs').promises;
const path = require('path'); */
const { findUserByUserName, getUserSaltedPassByUserName, getUserRolesByUserName, updateRefreshTokenByUserName } = require('../services/userDB.service');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    //const foundUser = usersDB.users.find(person => person.username === user);
    const foundUser = await findUserByUserName(user);
    if (!foundUser){ console.log('authController sent 401!'); return res.sendStatus(401);} //Unauthorized 
    // evaluate password 
    const userPassword = await getUserSaltedPassByUserName(user);
    const userRoles = await getUserRolesByUserName(user)

    console.log("ayush", userPassword, userRoles);

    const match = await bcrypt.compare(pwd, userPassword);
    if (match) {
        // create JWTs

        //const roles = Object.values(userRoles)
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": user,
                    "roles": userRoles
                } 
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 10800 } // 3 hrs
        );

        const refreshToken = jwt.sign(
            { "username": user },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving RefreshToken with curr user
        /* const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        ); */

        const result = await updateRefreshTokenByUserName(user, refreshToken);
        if (result){
            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 });
            res.json({ accessToken });
        }
        else {
            res.sendStatus(500);
        }
    } else {
        console.log('authController sent 401 from else!');
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };