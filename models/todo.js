const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String },
  priority: { type: String, default: "low" },
  owner: [{ type: Types.ObjectId, ref: "User" }],
  todos: [{ type: Types.ObjectId, ref: "Todos" }],
});

module.exports = model("Todo", schema);
