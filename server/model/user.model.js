const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let schemaUser = mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
let url = "mongodb://localhost:27017/pikoroBD";
var User = mongoose.model("user", schemaUser);
var privatekey = "this is my secret key djhdk";
exports.register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((doc) => {
        if (doc) {
          mongoose.disconnect();
          reject("we have this user in our database ");
        } else {
          bcrypt
            .hash(password, 10)
            .then((hashedpassword) => {
              let user = new User({
                username: username,
                email: email,
                password: hashedpassword,
              });
              user
                .save()
                .then((doc) => {
                  mongoose.disconnect();
                  resolve(doc);
                })
                .catch((err) => {
                  mongoose.disconnect();
                  reject(err);
                });
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        }
      });
  });
};
exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("we dont have this email in our database!!!!!!");
        } else {
          bcrypt
            .compare(password, user.password)
            .then((same) => {
              if (same) {
                //send token
                let token = jwt.sign({username:user.username},privatekey, {
                  expiresIn: "1h",
                });
                mongoose.disconnect();
                resolve(token);
                // jwt.decode(token) ken theb yraj3lek data
              } else {
                mongoose.disconnect();
                reject("invalid password");
              }
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        }
      });
  });
};