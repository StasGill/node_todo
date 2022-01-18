const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../../models/user");
const Todo = require("../../models/todo");

const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Email is incorect").isEmail(),
    check(
      "password",
      "Min lenth of password must be more than 6 simbols and less than 12 simbols"
    ).isLength({ min: 6, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorect data of registration",
        });
      }
      const { email, password, name } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "User already exist(" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword, name });

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something wrong with server(", error: e });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Email is incorect").isEmail(),
    check("password", "Password is incorect").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data in time of SignIn",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(400).json({ message: "User not found(" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Password incorrect" });
      }

      const todo = await Todo.find({ owner: user.id });

      const token = jwt.sign({ userId: user.id }, "jwtSecret");

      res.status(200).json({ token: token, userId: user.id, todo });
    } catch (e) {
      res.status(500).json({ message: "Something wrong with server(" });
    }
  }
);

module.exports = router;
