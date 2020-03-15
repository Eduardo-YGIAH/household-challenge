const express = require('express');
const router = new express.Router();
// const Challenge = require('../models/Challenge');
const challenge_controller = require('../controllers/challengeController');
const auth = require('../config/middleware/auth');


// create challenge
router.post('/challenge', auth, challenge_controller.create_challenge);

// get challenge
router.get('/challenge/:id', auth, challenge_controller.get_challenge);

// // get previous challenges
// router.get('/previous-challenges', auth, challenge_controller.all_challenges);

// update challenge
router.patch('/update-challenge/:id', auth, challenge_controller.update_challenge);

// delete challenge
router.delete('/challenge/:id', auth, challenge_controller.delete_challenge);

module.exports = router;