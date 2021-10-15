const express = require('express');
const router = express.Router();

const utilContr = require('../controllers/utilizador')

router.post('/criar',utilContr.criar)

router.post('/login', utilContr.login)

module.exports = router
