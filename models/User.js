const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, 'Por favor, inserte un nombre']
        },
        lastName: {
            type: String,
        },
        age: {
            type: Number,
            require: [true, 'Por favor, inserte su edad']
        },
        gender: {
            type: String,
            require: [true, 'Por favor, inserte su sexo']
        },
        username: {
            type: String,
            require: [true, 'Por favor, inserte su nombre de usuario']
        },
        email: {
            type: String,
            require: [true, 'Por favor, inserte un correo']
        },
        phone: {
            type: Number,
            require: [true, 'Por favor, inserte su número de teléfono']
        },
        password: {
            type: String,
            require: [true, 'Por favor, inserte una contraseña']
        },
        role: {
            type: String,
        },
        tokens: [],
    }, {timestamps: true}
);

const User = mongoose.model('User', UserSchema);


module.exports = User;