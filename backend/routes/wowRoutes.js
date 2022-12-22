const express = require('express');
const router = express.Router();
const { getWow } = require('../controllers/wowController');

router.route('/').get(getWow);

module.exports = router;