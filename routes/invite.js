const express = require('express');
const router = new express.Router();
const inviteController = require('../controllers/inviteController')
const auth = require('../config/middleware/auth');

router.post('/invite-members', inviteController.send_invite); 

module.exports = router;