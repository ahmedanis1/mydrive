const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("./middleware/routes")(app);
//require("./middleware/databases")(app);
require("./middleware/database")();

app.listen(4500, () => console.log("working"));
