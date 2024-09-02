const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const teachersRoutes = require("./src/routes/teacher");
const studentsRoutes = require("./src/routes/student");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/teachers", teachersRoutes);
app.use("/api/v1/students", studentsRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and Listening on PORT", process.env.PORT);
    })
  )
  .catch((err) => console.error(err));
