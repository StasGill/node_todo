const { Router } = require("express");

const register = Router();

register.get("/register", (req, res) => {
  res.send("Register");
});

module.exports = register;
