const express = require('express');
const router = express.Router();
const messageController = require('../../../controllers/messageController')


router.route('/')
    .post(messageController.recordNewMessage)

module.exports = router;