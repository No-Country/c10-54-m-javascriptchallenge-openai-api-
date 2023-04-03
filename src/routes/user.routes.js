const { Router } = require('express');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
// const authValidator = require('../validators/auth.validator');
// const userValidator = require('../validators/user.validator');

const router = Router();

router.post('/signup', authController.signUp);
router.post('/login',  authController.login);
router.get('/me', authController.protect, userController.getUser);

// router.put('/:id', authController.protect, userController.updateUser);

// router.get('/', userController.getAllUsers);

module.exports = router;