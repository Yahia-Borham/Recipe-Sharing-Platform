



const dotenv = require('dotenv')
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");



const DB = process.env.DATABASECONNECTION.replace('<DATABASEPASS>', process.env.DATABASEPASS);
console.log(process.env.DATABASECONNECTION);
function clusterconnection() {
    mongoose.connect(DB);
    mongoose.connection.on("connected", () => {
        console.log("connection succesful");
    })
    mongoose.connection.on("error", () => {
        console.log("connection failed");
    })

}

module.exports = clusterconnection;