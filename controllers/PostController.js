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
    }
}

module.exports = PostController;