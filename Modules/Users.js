


const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { type } = require("os");
const { trim } = require("validator");
const { validate } = require("./Recipes");
const { parse } = require("dotenv");



const Users_Data = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [1, "name must be at least one character"],
        maxLength: [20, "name must be at most one 20"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "plz enter a valied email"]
    },
    password: {
        type: String,
        required: true,
        min: [1, "your password must be at leat 1 character"],
        max: [20, "your password must be at most 20 character"],
        /*  validate: {
              validator: function (val) {
                  return val === this.passconfirmation
              }
          }*/
    },
    passconfirmation: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val === this.password
            }
        }
    },
    passchangetime: {
        type: Date,
        default: new Date()
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ["user", "chef"],
            message: ["plz enter a valied role either a user or a chef"]
        }
    }


})


Users_Data.methods.verifypassword = async function (userpassword) {

    return await bcrypt.compare(userpassword, this.password);
}

Users_Data.methods.checkIfPassChange = function (payloadCreationTime, passUpdateTime) {

    passUpdateTime = parseInt(passUpdateTime.getTime() / 1000, 10)
    if (payloadCreationTime > passUpdateTime)
        return true;
    else
        return false;
}


Users_Data.pre("save", async function (next) {

    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passconfirmation = undefined;

})





const Users = mongoose.model("Users", Users_Data)
module.exports = Users;