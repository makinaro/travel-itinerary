const userController = require('../controllers/userController.cjs');
const router = require('express').Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.get('/users/search', userController.getUserByUsername);

module.exports = router;