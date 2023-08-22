const { UserController } = require("../controllers/UserController");
const { comparePassword } = require("../services/encryptPassword");

async function userLoginAdapter(req, res, next) {
    const { email } = req.params;
    const { password } = req.body;

    if(!email || !password){
        return res.status(400).end();
    }

    const user = await UserController.findByEmail(email);

    if(!user){
        return res.status(404).end();
    }

    passwordIsValid = await comparePassword(password, user.dataValues.password);

    if(!passwordIsValid){
        return res.status(403).end();
    }

    req.user = user.dataValues;

    next();
};

module.exports = { userLoginAdapter };
