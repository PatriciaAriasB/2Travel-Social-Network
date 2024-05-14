const Post = require('../models/Post');
const Comment = require('../models/Comment');


const PostController = {
    async create(req, res){
        try {
            const post = await Post.create({
                ...req.body, 
                commentId:req.comment._id
            })
            res.status(201).send(post)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'Ha habido un problema al crear la publicación', error})
        }
    },
    async update(req, res){
        try {
            const post = await Post.findByIdAndUpdate(req.params._id, req.body, {new: true})
            res.send({msg: 'Post actualizado correctamente', post})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'Ha habido un problema al actualizar la publicación'})
        }
    },
    async delete(req, res){
        try {
            const post = await Post.findByIdAndDelete(req.params._id)
            res.send({msg: 'Post eliminado correctamente', post})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'Ha habido un problema al eliminar la publicación'})
        }
    },
    async getPostsByTitle(req, res){ //CAMBIAR TITLE A USERNAME CUANDO TENGAMOS EL USERCONTROLLER
        try {
           if(req.params.title.length > 20){
            return res.status(400).send('Busqueda demasiado larga')
           } 
           const title = new RegExp(req.params.title, 'i');
           const post = await Post.find({title})
           res.send(post)
        } catch (error) {
            console.log(error)
        }
    },
    async getPostById(req, res){
        try {
            const post = await Post.findById(req.params._id)
            res.send(post)
        } catch (error) {
            console.error(error)
            res.status(500).send({msg: 'Lo sentimos, no hemos podido encontrar este Post', error})
        }
    },
    async insertComment(req, res) {
        try {
          const post = await Post.findByIdAndUpdate(
            req.params._id,
            { $push: { comments: { body: req.body.body, userId: req.user._id } } },
            { new: true }
          );
          res.send(post);
        } catch (error) {
          console.error(error);
          res.status(500).send({ msg: "Hubo un problema con su comentario" });
        }
      },

      async getAll(req, res) {
        try {
          const { page = 1, limit = 10 } = req.query;
          const posts = await Post.find()
            .limit(limit)
            .skip((page - 1) * limit);
          res.send(posts);
        } catch (error) {
          console.error(error);
        }
      },
    }
    


    
    

module.exports = PostController;