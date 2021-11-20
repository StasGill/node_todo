const auth = require("../../middleware/auth.middleware");

const { Router } = require("express");

const User = require("../../models/user");

const Todos = require("../../models/todos");
const Todo = require("../../models/todo");

const router = Router();

//Get all Todos -- body{id: <Todo.Id>}

router.get("/", auth, async (req, res) => {
  try {
    // await User.findById(req.user.userId);

    const todos = await Todos.find({ owner: req.body.id });

    res.status(200).json({ message: "Good", todos: todos });
  } catch (e) {
    res.status(500).json({ message: "Something wrong with server(", e });
  }
});

// Add one Todos -- body{id: <Todo.Id>,title: <TEXT>}

router.post("/", auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.body.id);

    const todos = await new Todos({
      title: req.body.title,
      owner: req.body.id,
      isValid: req.body.isValid,
    });

    await todos.save();

    todo.todos = [...todo.todos, todos];

    await todo.save();

    res.status(200).json({ message: "Good", todos: todo.todos });
  } catch (e) {
    res.status(500).json({ message: "Something wrong with server(", e });
  }
});

// Update one Todo -- body{id: <Todos.Id>,title: <TEXT>,isValid: <TRUE or False>}

router.patch("/", auth, async (req, res) => {
  try {
    const result = await Todos.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      isValid: req.body.isValid,
    });

    res.status(200).json({ message: "Good", result: result });
  } catch (e) {
    res.status(500).json({ message: "Something wrong with server(", e });
  }
});

//Delete Todo by Id -- body{id: <ID>,owner: <ID Owner Todo>}

router.delete("/", auth, async (req, res) => {
  try {
    const result = await Todos.findByIdAndDelete(req.body.id);
    // const todo = await Todo.findById(req.user.owner);
    // const newTodo = todo.todos.filter((item) => item._id !== req.body.id);
    // todo.todos = newTodo;
    // await todo.save();

    res.status(200).json({ message: "Todos delete", result: result });
  } catch (e) {
    res.status(500).json({ message: "Something wrong with server(", e });
  }
});

module.exports = router;