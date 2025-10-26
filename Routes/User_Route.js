




const express = require("express");
const User_Controller = require("../Controllers/User_Controller");
const Signup_Login_Controller = require("../Controllers/Signup&Login_Controller");




const userRoute = express.Router();
userRoute.use(Signup_Login_Controller.Authorizeatuion);
userRoute.route("/editaccount").patch(User_Controller.Edit_User_Data);
userRoute.use(Signup_Login_Controller.Authorized_User("user"));
userRoute.route("/getrecipes").get(User_Controller.Find_All_Recipes);
userRoute.route("/getrecipe/:chef_name/:recipe_name").get(User_Controller.Find_Recipe);
userRoute.route("/filter&sortrecipes").get(User_Controller.FilterSort_Recipes);
userRoute.route("/createreview/:chef_name/:recipe_name").post(User_Controller.Create_Review);
userRoute.route("/editreview/:chef_name/:recipe_name").patch(User_Controller.Edit_Review);
userRoute.route("/deletereview/:chef_name/:recipe_name").delete(User_Controller.Delete_Review);

module.exports = userRoute;