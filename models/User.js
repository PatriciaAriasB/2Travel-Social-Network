const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Por favor, inserte un nombre']
        },
        lastName: {
            type: String,
        },
        age: {
            type: Number,
            required: [true, 'Por favor, inserte su edad']
        },
        gender: {
            type: String,
            required: [true, 'Por favor, inserte un dato']
        },
        username: {
            type: String,
            required: [true, 'Por favor, inserte su nombre de usuario'],
            unique: true
        },
        email: {
            type: String,
            match: [/.+\@.+\..+/, 'Este correo no es valido'],
            required: [true, 'Por favor, inserte tu correo'],
            unique: true
        },
        phone: {
            type: Number,
            required: [true, 'Por favor, inserte su número de teléfono'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Por favor, inserte una contraseña']
        },
        role: {
            type: String,
         
        },
        online: {
            type: Boolean,
        },
        img: String,
        postIds: [{type: ObjectId, ref: 'Post'}],
        tokens: [],
        likes: [{ type: ObjectId, ref: 'Post' }],
    }, {timestamps: true}
);

UserSchema.methods.toJSON = function(){
    const user = this._doc;
    delete user.tokens;
    delete user.__v;
    return user;
}

const User = mongoose.model('User', UserSchema);


module.exports = User;