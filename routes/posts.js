const express = require ('express');
const PostController = require('../controllers/PostController');
const router = express.Router();


router.post('/', PostController.create);
router.put('/id/:_id', PostController.update);
router.delete('/id/:_id', PostController.delete);
router.get('/title/:title', PostController.getPostsByTitle); //CAMBIAR TITLE A USERNAME MAS ADELANTE
router.get('/id/:_id', PostController.getPostById);



module.exports = router;