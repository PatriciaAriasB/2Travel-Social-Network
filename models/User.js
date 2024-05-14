const mongoose = require('mongoose');

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
            required: [true, 'Por favor, inserte un correo electronico válido'],
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
        tokens: [],
    }, {timestamps: true}
);

const User = mongoose.model('User', UserSchema);


module.exports = User;