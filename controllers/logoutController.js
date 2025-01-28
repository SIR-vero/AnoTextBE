/* const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path'); */
const { getUserByRefreshToken, updateRefreshTokenByUserName } = require('../services/userDB.service');

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    console.log("cookies", cookies);
    if (!cookies?.jwt) return res.sendStatus(204);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;
    //const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    const userName = await getUserByRefreshToken(refreshToken);
    console.log("userName", userName);
    if (!userName) {
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000 });
        return res.sendStatus(204);
    }

    // Delete Token
    /* const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    ); */

    const result = await updateRefreshTokenByUserName(userName, '');
    console.log('result', result);
    if(result){}else{console.log("Something Went Wrong Couldn't clear refreshToken")}

    res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000 });
    res.sendStatus(204);
}

module.exports = { handleLogout };