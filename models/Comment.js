const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Por favor, introduce tu nombre'],
    },
    body: {
        type: String,
        require: [true, 'Por favor, inserte una descripción']
    },
  
}, {timestamps: true});

CommentsSchema.index({
    title: 'text',
})

const Comment = mongoose.model('Comments', CommentsSchema)





module.exports = Comment;
