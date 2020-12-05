const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./middleware/error");
const cors = require("cors");
require("dotenv").config();

const db = process.env.DB_CONNECT;
const app = express();
app.use(express.json());
app.use(cors());
//set the error middleware
const users = require("./api/routes/users");

//making express use the router
app.use("/api/users", users);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log("The Server has started on: " + PORT));

app.use(notFound);
app.use(errorHandler);
mongoose.connect(
  db,
  {
    useNewUrlParser: true,

    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("Mongo Db Connected");
  }
);
