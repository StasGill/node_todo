const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String },
  important: { type: String, default: "not important" },
  owner: [{ type: Types.ObjectId, ref: "User" }],
  todos: [{ type: Types.ObjectId, ref: "Todos" }],
});

module.exports = model("Todo", schema);
