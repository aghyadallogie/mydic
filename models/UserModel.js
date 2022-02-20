const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  languages: [String],
});

exports.UserModel = model("User", userSchema);

