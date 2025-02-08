/* const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
} */

const { addNewUserToDB, findUserByUserName } = require('../services/userDB.service');

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto')

const handleNewUser = async (req, res) => {
    console.log("regController Started!");
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    // check for duplicate usernames in the db
    //const duplicateUser = usersDB.users.find(person => person.username === user);

    const duplicateUser = await findUserByUserName(user);
    if (duplicateUser) return res.status(409).json({ 'message': 'Username Already Exists! Please use a different username' }); //Conflict 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const uuId = crypto.randomUUID().slice(0, 10);
        //store the new user
        const newUser = { 
            "username": user, 
            "roles": {
                "User": 2001
            },
            "password": hashedPwd,
            "userId": uuId
        };
        /* usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        ); */

        await addNewUserToDB(newUser);

        //console.log(usersDB.users);
        res.status(201).json({ 'success': `New user ${user} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };