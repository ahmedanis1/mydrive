const user = require("../routes/users");
const admin = require("../routes/admin");
const Files = require("../routes/Files");

module.exports = app => {
  app.use("/drive/user", user);
  app.use("/drive/admin", admin);
  app.use("/drive/file", Files);
};
