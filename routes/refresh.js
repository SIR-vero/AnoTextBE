const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refershTokenController');

router.get('/', refreshController.handleRefresh);

module.exports = router;