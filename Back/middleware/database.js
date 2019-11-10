const mongoose = require("mongoose");
module.exports = () => {
  mongoose
    .connect("mongodb://localhost/admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("connected sucessfuly"))
    .catch(err => console.error("not connected", err));
};
