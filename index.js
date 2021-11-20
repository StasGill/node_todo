const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;

const mongoString =
  "mongodb+srv://stan:stan12@cluster0.5wrpa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();
app.use(express.json({ extended: true }));
app.use("/api/auth", require("./api/routes/auth.routes"));
app.use("/api/todo", require("./api/routes/todo.routes"));
app.use("/api/todos", require("./api/routes/todos.routes"));

async function start() {
  try {
    await mongoose.connect(mongoString, {
      useNewUrlParser: true,
    });
    app.listen(PORT, () => {
      console.log("Server has been started at port ", PORT);
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
