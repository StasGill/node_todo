const express = require("express");
const mongoose = require("mongoose");
const toDoRoute = require("./todo");
const register = require("./api/registration");

const PORT = process.env.PORT || 4000;

const mongoString =
  "mongodb+srv://stan:stan12@cluster0.5wrpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();
app.use(toDoRoute);
app.use(register);

async function start() {
  try {
    await mongoose.connect(mongoString, {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log("Server has been started at port ", PORT);
    });
  } catch (e) {
    console.log("ERROR", e);
  }
}

start();
