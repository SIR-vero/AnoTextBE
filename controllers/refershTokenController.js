const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefresh = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt){ console.log('refreshTokenController sent 401!'); return res.sendStatus(401);}
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Unauthorized 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.UserInfo.username){ return res.sendStatus(403);}
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": roles
                    } 
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({accessToken})
        }
    );
}

module.exports = { handleRefresh };