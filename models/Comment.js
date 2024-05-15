const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentsSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'Por favor, inserte una descripción']
    },
    postId:{
        postId: {type: ObjectId, ref: 'Post'}
    },
    userId: {
        userId: {type: ObjectId, reg: 'User'}
    }
  
}, {timestamps: true});

CommentsSchema.index({
    title: 'text',
})

const Comment = mongoose.model('Comments', CommentsSchema)





module.exports = Comment;
