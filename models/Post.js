const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Por favor, inserte un título'],
    },
    body: {
        type: String,
        required: [true, 'Por favor, inserte una descripción']
    },
    img: {
        type: String,
        // likes: [{type: ObjjectId, ref: 'User'}],
        // userId: [{type: ObjectId, ref: 'User'}]
        //commentIds: [{type: ObjectId, ref: 'Comment'}]
    
    }
}, {timestamps: true});

PostSchema.index({
    title: 'text',
});

const Post = mongoose.model('Post', PostSchema);





module.exports = Post;

