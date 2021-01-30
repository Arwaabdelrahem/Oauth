const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },
  local: {
    name: { type: String },
    email: {
      type: String,
      lowercase: true,
    },
    password: { type: String },
  },
  google: {
    id: { type: String },
    name: { type: String },
    email: {
      type: String,
      lowercase: true,
    },
  },
  facebook: {
    id: { type: String },
    name: { type: String },
    email: {
      type: String,
      lowercase: true,
    },
  },
});

function validateSignUp(user) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

function validateSignIn(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
}

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.jwtKey);
};
const User = mongoose.model("User", userSchema);

module.exports.User = User;
module.exports.validate = validateSignUp;
module.exports.validateLog = validateSignIn;
