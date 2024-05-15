const express = require ('express');
const CommentController = require('../controllers/CommentController');
const router = express.Router();
const {authentication, isAuthor} = require('../middleware/authentication')


router.post('/id/:_id', authentication, CommentController.create);
router.put('/id/:_id', authentication, isAuthor, CommentController.update);
router.delete('/id/:_id', authentication, isAuthor, CommentController.delete);
router.get('/title/:title', CommentController.getCommentByTitle); 
router.get('/id/:_id', CommentController.getCommentById);



module.exports = router;