const { findUserByUserName } = require('../services/userDB.service');
const { addNewMeesage, getMessagesByUsername } = require('../services/messageDB.service');

const recordNewMessage = async (req, res) => {
    const userName = req.body.userName;
    const message = req.body.message;
    
    if (!userName) return res.status(400).json({ 'message': "username empty !" });
    if (!message) return res.status(400).json({ 'message': "message empty !" });

    const foundUser = await findUserByUserName(userName);
    if (!foundUser) {
        return res.status(400).json({
            'message': "user Not Found !"
        });
    }
    
    const result = await addNewMeesage(userName, message);
    console.log("recorderNewMessage: ", result);
    if(result){
        res.status(201).json({'message': 'message added !'})
    } else {
        res.status(500).json({'message': 'Something Went Wrong !'})
    }

}

const getMessages = async (req, res) => {
    const loggedInUser = req.user;
    if(loggedInUser){
        const messages = await getMessagesByUsername(loggedInUser);
        //console.log('messages: ', messages);
        const response = {
            messages
        };
        res.status(200).json(response);
    }
}

module.exports = {
    recordNewMessage, 
    getMessages
}