const express = require('express');
const router = new express.Router();
const Household = require('../models/Household');
const household_controller = require('../controllers/householdController.js');
const auth = require('../config/middleware/auth');

//create a household
router.post('/household', auth, household_controller.create_household);

//get household page from owner id (req.user._id)
router.get('/household', auth, household_controller.get_household);

//user joins household as member (param is household id, user is  req.user.id)
router.put('/household/join/:id', auth, household_controller.join_household);

//delete household
router.delete('/household/:id', auth, household_controller.delete_household);

module.exports = router;
