const { hashPassword } = require("../services/encryptPassword");


function isValidUser(user){
    return Object.values(user).every(value => value !== null && value !== '');
};

async function userCreationAdapter(req, res, next) {
    const { user } = req.body;

    // TODO

    if (!user){
        return res.status(400).end();
    }

    const validationUser = isValidUser(user);

    if (!validationUser){
        return res.status(400).end();
    }

    const encryptedUser = {
        ...user,
        password: await hashPassword(user.password)
    };

    req.encryptedUser = encryptedUser;

    next();
}

module.exports = { userCreationAdapter }
