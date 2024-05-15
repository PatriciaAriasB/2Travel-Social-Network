const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentsSchema = new mongoose.Schema({
    body: {
        type: String,
        required: [true, 'Por favor, inserte una descripción']
    },
    
        postId: {type: ObjectId, ref: 'Post'},
    
    
        userId: {type: ObjectId, reg: 'User'},
         likes: [{ type: ObjectId }],
  
}, {timestamps: true});

CommentsSchema.index({
    title: 'text',
})





const Comment = mongoose.model('Comments', CommentsSchema)





module.exports = Comment;
