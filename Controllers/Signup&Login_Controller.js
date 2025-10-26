



const Users = require("./../Modules/Users");
const Factory_Functions = require("./Refactored_Functions");
const Upgraded_Error = require("./../utilities/Upgraded Error Object")









const Signup = Factory_Functions.F_Signup(Users)

const login = Factory_Functions.F_login(Users)

const Authorizeatuion = Factory_Functions.F_Authorizeatuion(Users)

const Authorized_User = (...roles) => async (req, res, next) => {

    const user = await Users.findOne({ name: req.user.name });

    if (roles.includes(user.role))
        return next();
    else
        return next(new Upgraded_Error("Your role are not authorized for this route", 403));

}








module.exports = {
    Signup: Signup,
    login: login,
    Authorizeatuion: Authorizeatuion,
    Authorized_User: Authorized_User
}