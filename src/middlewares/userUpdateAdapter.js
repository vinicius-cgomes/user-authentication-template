const { hashPassword } = require('../services/encryptPassword');
const { UserController } = require('../controllers/UserController');
const User = require('../models/user');

async function userUpdateAdapter(req, res, next) {
    const { id } = req.params;
    const { firstName, lastName, password } = req.body;

    const user = await UserController.findById(id);

    if(!user){
        return res.status(404).end();
    }

    if(!password){
        const {dataValues} = user;
        const newUser = {
            ...dataValues,
            firstName: firstName ?? user.firstName,
            lastName: lastName ?? user.lastName
        };
        req.updatedUser = newUser;
    } else {
        const {dataValues} = user;
        const newUser = {
            ...dataValues,
            password: await hashPassword(password)
        };
        req.updatedUser = newUser;
    }

    next();
}

module.exports = { userUpdateAdapter }
