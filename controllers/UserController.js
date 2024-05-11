const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/keys');

const UserController = {
    async register(req, res){
        try {
            const password = bcrypt.hashSync(req.body.password, 10)
            const user = await User.create({...req.body, password, role:"user"})
            res.status(201).send({msg: `Bienvenid@ ${req.body.name}, su cuenta ha sido creada correctamente`, user})
        } catch (error) {
            console.error(error);
        }
    },
    async login (req, res){
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            const token = jwt.sign({_id: user._id}, jwt_secret)
            if(user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token)
            await user.save();
            res.send({msg: 'Bienvenid@', token})
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }
}




module.exports = UserController;