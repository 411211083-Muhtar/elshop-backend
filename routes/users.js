const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:user_id', userController.getUser);
router.get('/', userController.getUsers);

module.exports = router;
