
const { findUserByUserId} = require('../services/userDB.service');

const getUser = async (req, res) => {
    const {userId} = req?.body;
    if(!userId) return res.status(400).json({ 'message': 'UserId required.' });

    const user = await findUserByUserId(userId);

    if(user) {
        return res.status(200).json(user)
    } else {
        return res.status(400).json({"message": "Invalid UserId"})
    }
}

module.exports = {getUser}