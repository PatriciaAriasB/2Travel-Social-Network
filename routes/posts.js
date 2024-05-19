const express = require ('express');
const PostController = require('../controllers/PostController');
const router = express.Router();
const {authentication, isAuthor} = require('../middleware/authentication')


router.post('/', authentication, PostController.create);
router.put('/id/:_id', authentication, PostController.update);
router.delete('/id/:_id', authentication, isAuthor, PostController.delete);
router.get('/title/:title', PostController.getPostsByTitle); 
router.get('/id/:_id', PostController.getPostById);
router.get('/', PostController.getAll);
router.get('/postAndComments', PostController.getPostAndComments);
router.put('/comments/:_id', PostController.insertComment);
router.put('/likes/:_id',authentication, PostController.like);
router.put('/dislike/:_id',authentication, PostController.dislike);


module.exports = router;