const Comment = require('../models/Comment');

const CommentController = {
    async create(req, res){
        try {
            const comment = await Comment.create(req.body)
// Post.findByIdAndUpdate
            res.status(201).send(comment)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'Ha habido un problema al crear el comentario'})
        }
    },
    async update(req, res){
        try {
            const comment = await Comment.findByIdAndUpdate(req.params._id, req.body, {new: true})
            res.send({msg: 'Comentario actualizado correctamente', comment})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'Ha habido un problema al actualizar el comentario'})
        }
    },
    async delete(req, res){
        try {
            const comment = await Comment.findByIdAndDelete(req.params._id)
            res.send({msg: 'Comentario eliminado correctamente', comment})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'Ha habido un problema al eliminar el comentario'})
        }
    },
    async getCommentByTitle(req, res){
        try {
           if(req.params.title.length > 20){
            return res.status(400).send('Busqueda demasiado larga')
           } 
           const title = new RegExp(req.params.title, 'i');
           const comment = await Comment.find({title})
           res.send(comment)
        } catch (error) {
            console.log(error)
        }
    },
    async getCommentById(req, res){
        try {
            const comment = await Comment.findById(req.params._id)
            res.send(comment)
        } catch (error) {
            console.error(error)
            res.status(500).send({msg: 'Sorry, no hemos podido encontrar este comentario', error})
        }
    }
}

module.exports = CommentController;