const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys');

const UserController = {
    async register(req, res, next) {
        try {
            const password = bcrypt.hashSync(req.body.password, 10)
            const user = await User.create({ ...req.body, password, role: "user" })
            res.status(201).send({ msg: `Bienvenid@ ${req.body.name}, su cuenta ha sido creada correctamente`, user })
        } catch (error) {
            next(error)
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            });
            if (!user) {
                return res.status(400).send({ msg: 'Correo o contraseña incorrecto' })
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if (!isMatch) {
                return res.status(400).send({ msg: 'Correo o contraseña incorrecto' })
            }
            const token = jwt.sign({ _id: user._id }, jwt_secret)
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token)
            await user.save();
            res.send({ msg: 'Bienvenid@', token })
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async logout(req, res) {
        try {
            await User.findByIdAndUpdate(req.user._id, {
                $pull: { tokens: req.headers.authorization },
            });
            res.send({ msg: 'Desconectado con éxito' })
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: 'Parece que hubo un problema al tratar de desconectar al usuario' })
        }
    },
    async getOnline(req, res) {
        try {
            const user = await User.findOne({ _id: req.params._id })
            if (!user.online) {
                user.online = true;
                await user.save();
                return res.send({ msg: `El usuario con el id: ${req.params._id}, está online` });
            } else {
                return res.send({ msg: `El usuario con el id: ${req.params._id}, está offline` });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async getUserByName(req, res) {
        try {
            if (req.params.name.length > 20) {
                return res.status(400).send('Su busqueda es muy larga')
            }
            const name = new RegExp(req.params.name, 'i');
            const user = await User.find({ name })
            res.send(user)
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    },
    async follow(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params._id,
                { $push: { followerIds: req.user._id } },
                { new: true }
            );
            await User.findByIdAndUpdate(
                req.user._id,
                { $push: { followIds: req.params._id } },
                { new: true }
            );
            res.send(user)
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: 'Hubo un problema con su peticion' })
        }
    },
    async unfollow(req, res){
        try {
            const unfollow = await User.findByIdAndUpdate(
                req.params._id,
                {$pull: {followerIds: req.user._id}},
                {new: true}
            )
            res.send(unfollow)
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: 'Hubo un problema con su peticion' }) 
        }
    },
    async getAllInfo(req, res){
        try {
            const user = await User.findById()
            .populate({
                path: 'PostIds'
            })
            .populate({
                path: 'followerIds'
            })
            res.send(user)
        } catch (error) {
            console.error(error);
            res.status(500).send({ msg: 'Hubo un problema con su peticion', error})
        }
    }
}




module.exports = UserController;