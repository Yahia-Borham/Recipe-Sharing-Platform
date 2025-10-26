




const express = require("express");
const Chef_Controller = require("../Controllers/Chef_Controller");
const Signup_Login_Controller = require("../Controllers/Signup&Login_Controller");




const chefRoute = express.Router();
chefRoute.use(Signup_Login_Controller.Authorizeatuion);
chefRoute.use(Signup_Login_Controller.Authorized_User("chef"));
chefRoute.route("/createrecipe").post(Chef_Controller.Create_Recipe);
chefRoute.route("/updaterecipe/:chef_name/:recipe_name").patch(Chef_Controller.Update_Recipe)
chefRoute.route("/Delete_Recipe/:recipe_name").delete(Chef_Controller.Delete_Recipe)

module.exports = chefRoute;