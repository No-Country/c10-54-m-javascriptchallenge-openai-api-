const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db/database");
const initModels = require('./models/initModels');

initModels();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const PORT = 8000;

db.authenticate()
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((error) => console.log(error));

db.sync()
  .then(() => console.log("DB synchronized"))
  .catch((error) => console.log(error));

/* app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes); */

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});
