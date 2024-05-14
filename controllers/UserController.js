const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config/keys');

const UserController = {
    async register(req, res, next){
        try {
            const password = bcrypt.hashSync(req.body.password, 10)
            const user = await User.create({...req.body, password, role:"user"})
            res.status(201).send({msg: `Bienvenid@ ${req.body.name}, su cuenta ha sido creada correctamente`, user})
        } catch (error) {
            next(error)
        }
    },
    async login (req, res){
        try {
            const user = await User.findOne({
                email: req.body.email
            });
            if(!user){
                return res.status(400).send({msg: 'Correo o contraseña incorrecto'})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if(!isMatch){
                return res.status(400).send({msg: 'Correo o contraseña incorrecto'})
            }
            const token = jwt.sign({_id: user._id}, jwt_secret)
            if(user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token)
            await user.save();
            res.send({msg: 'Bienvenid@', token})
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async logout(req, res){
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: {tokens: req.headers.authorization},
            });
            res.send({msg: 'Desconectado con éxito'})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg: 'Parece que hubo un problema al tratar de desconectar al usuario'})
        }
    },
    async getOnline(req, res){
        try {
            const user = await User.findOne({_id: req.params._id})
            if(!user.online){
                user.online = true;
                await user.save();
                return res.send({msg: `El usuario con el id: ${req.params._id}, está online`});
            }else{
                return res.send({msg: `El usuario con el id: ${req.params._id}, está offline`});
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }
}




module.exports = UserController;