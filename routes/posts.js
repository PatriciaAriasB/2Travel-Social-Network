const express = require ('express');
const PostController = require('../controllers/PostController');
const router = express.Router();
const {authentication, isAuthor} = require('../middleware/authentication')


router.post('/', authentication, PostController.create);
router.put('/id/:_id', authentication, isAuthor, PostController.update);
router.delete('/id/:_id', authentication, isAuthor, PostController.delete);
router.get('/title/:title', PostController.getPostsByTitle); //CAMBIAR TITLE A USERNAME MAS ADELANTE
router.get('/id/:_id', PostController.getPostById);
router.get('/', PostController.getAll);
router.put('/comments/:_id', PostController.insertComment);
router.put('/likes/:_id',PostController.like);


module.exports = router;