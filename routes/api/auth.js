const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const { authenticate, upload } = require('../../middlewares');

router.post('/register', ctrl.register);

router.post('/verify', ctrl.resentVerifyEmail);

router.post('/login', ctrl.login);

router.get('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.currentUser);

router.get('/verify/:verificationToken', ctrl.verifyEmail)

router.patch('/', authenticate, ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar)

module.exports = router;