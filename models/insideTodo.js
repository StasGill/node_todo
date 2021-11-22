const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  title: { type: String, required: true },
  isValid: { type: Boolean, default: false },
  important: { type: String, default: "not important" },
  owner: { type: Types.ObjectId, ref: "Todo" },
});

module.exports = model("InsideTodo", schema);
