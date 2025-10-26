



const express = require("express");
const S_L_Functions = require("./../Controllers/Signup&Login_Controller");
const Signup_Login = express.Router();

Signup_Login.route("/").post(S_L_Functions.Signup);
Signup_Login.route("/").get(S_L_Functions.login);







module.exports = Signup_Login;