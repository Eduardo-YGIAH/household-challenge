const express = require('express');
const router = express.Router();
const auth = require('../config/middleware/auth');
// const upload = require('../config/multer_config');
const user_controller = require('../controllers/userController');

//signup
router.post('/users', user_controller.signUp);

//login
router.post('/users/login', user_controller.login);

//logout from current device
router.post('/users/logout', auth, user_controller.logout);

//logout from all devices
router.post('/users/logoutAll', auth, user_controller.logoutAll);

//get user profile
router.get('/users/me', auth, user_controller.profile);

//update user info
router.patch('/users/me', auth, user_controller.update_info);

//update user avatar
router.patch('/users/me/avatar', auth, user_controller.upload_avatar);

//delete user
router.delete('/users/me', auth, user_controller.delete_user);

module.exports = router;
// upload.single('image'),
