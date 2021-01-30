const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

module.exports = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Unauthorized");
  try {
    const decode = jwt.verify(token, process.env.jwtKey);

    let user = await User.findById(decode._id);
    if (!user) return res.status(404).send("User not found");

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
