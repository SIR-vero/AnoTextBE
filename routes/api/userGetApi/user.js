const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/userController')


router.route('/')
    .post(userController.getUser)

module.exports = router;