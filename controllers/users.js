const { validateLog, validate, User } = require("../models/user");
const googlePlusToken = require("passport-google-plus-token");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res, next) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ "local.email": req.body.email });
  if (user) return res.status(400).send("User with same email already exists");

  user = new User({
    method: "local",
    local: {
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    },
  });
  await user.save();
  res.status(201).send(user);
};

exports.signIn = async (req, res, next) => {
  const { error } = validateLog(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ "local.email": req.body.email });
  if (!user) return res.status(404).send("Invalid email or password");

  const compare = await bcrypt.compare(req.body.password, user.local.password);
  if (!compare) return res.status(404).send("Invalid email or password");

  const token = user.generateToken();
  res.status(200).send({ user, token });
};

exports.googleOauth = async (req, res, next) => {
  const token = req.user.generateToken();
  res.status(200).send({ user: req.user, token });
};

exports.facebookOauth = async (req, res, next) => {
  const token = req.user.generateToken();
  res.status(200).send({ user: req.user, token });
};

exports.secret = async (req, res, next) => {
  res.status(200).send("Secret");
};
