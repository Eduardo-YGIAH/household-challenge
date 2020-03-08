var express = require('express');
var router = express.Router();
const Household = require('../models/Household');
const auth_controller = require('../controllers/authController');

/* GET users listing. */
router.get('/', auth_controller.getTestController);

router.post('/test', async (req, res) => {
  console.log(req.body);
  const household = new Household(req.body);
  household
    .save()
    .then(() => {
      res.send(household);
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

module.exports = router;
