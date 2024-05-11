const Post = require('../models/Post');

const PostController = {
    async create(req, res){
        try {
            const post = await Post.create(req.body)
            res.status(201).send(post)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'Ha habido un problema al crear la publicación'})
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
    }
}

module.exports = PostController;