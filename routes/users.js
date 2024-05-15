const express = require('express');
const UserController = require('../controllers/UserController');
const router = express.Router();
const {authentication} = require('../middleware/authentication');
const PostController = require('../controllers/PostController');

router.post('/', UserController.register);
router.post('/login', UserController.login);
router.delete('/logout', authentication, UserController.logout);
router.get('/id/:_id', UserController.getOnline);
router.get('/name/:name', UserController.getUserByName);
router.put('/follows/:_id', authentication, UserController.follow);
router.put('/unfollow/:_id', authentication, UserController.unfollow);



module.exports = router;