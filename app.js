const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" });
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./Routes/User_Route");
const chefRoute = require("./Routes/Chef_Route");
const Signup_Login = require("./Routes/Signup&Login_Route");
const clusterconnection = require("./utilities/Cluster_connection");
const Error_Handling_Function = require("./utilities/Error Handling Function");


clusterconnection();
const app = express();
app.use(express.json());
app.set('query parser', 'extended');


/*app.all('/*asdasdasd', (req, res, next) => {
  const err = new Upgraded_Error("asdaedadasdasda", 404)
  next(err);
});*/
//const port = process.env.PORT;
app.use("/userRoutes", userRoute);
app.use("/chefRoutes", chefRoute);
app.use("/signup_login", Signup_Login);
app.use("/*undefined_page", (req, res, next) => {
  res.status(404).json({
    Status: "Failed",
    message: "undefined URL, plz enter another one"
  })
})
app.use(Error_Handling_Function);
app.listen(3000, () => {
  console.log(`server running on port `);
});
