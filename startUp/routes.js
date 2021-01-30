const bodyParser = require("body-parser");
const users = require("../routes/Users");

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/users", users);
};
