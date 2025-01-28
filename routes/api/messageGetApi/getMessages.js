const express = require('express');
const router = express.Router();
const messageController = require('../../../controllers/messageController')


router.route('/')
    .get(messageController.getMessages)

module.exports = router;