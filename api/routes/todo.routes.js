const auth = require("../../middleware/auth.middleware");

const { Router } = require("express");

const User = require("../../models/user");
const user = require("../../models/user");
const Todo = require("../../models/todo");

const router = Router();

//Get alll Todo

router.get("/", auth, async (req, res) => {
  try {
    await User.findById(req.user.userId);

    const todo = await Todo.find({ owner: req.user.userId });

    res.status(200).json({ message: "Good", todo: todo });
  } catch (e) {
    res.status(500).json({ message: "Something wrong with server(", e });
  }
});

// Add one Todo -- body{title: <TEXT>}

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    const todo = await new Todo({
      title: req.body.data.title,
      owner: req.user.userId,
      priority: req.body.data.priority,
    });

    await todo.save();

    user.todo = [...user.todo, todo];

    await user.save();

    res.status(200).json({ message: "Good", todo: user.todo });
  } catch (e) {
    res.status(500).json({ message: "Something wrong with server(", e });
  }
});

// Update one Todo -- body{title: <TEXT>}

router.patch("/", auth, async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      priority: req.body.priority,
    });

    res.status(200).json({ message: "Good", result: result });
  } catch (e) {
    res.status(500).json({ message: "Something wrong with server(", e });
  }
});

// Update Todo Owner -- body{id: <ID>, owner: <ID>}

router.patch("/owner/", auth, async (req, res) => {
  try {
    const result = await Todo.findById(req.body.id);

    result.owner = [...result.owner, req.user.userId];

    await result.save();

    res.status(200).json({ message: "Good", owner: result.owner });
  } catch (e) {
    res.status(500).json({ message: "Something wrong with server(", e });
  }
});

//Delete Todo by Id -- body{id: <ID>}

router.delete("/", auth, async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.body.id);
    const user = await User.findById(req.user.userId);
    const newTodo = user.todo.filter((item) => item._id !== req.body.id);
    user.todo = newTodo;
    await user.save();

    res.status(200).json({ message: "Todo delete", result: result });
  } catch (e) {
    res.status(500).json({ message: "Something wrong with server(", e });
  }
});

module.exports = router;
