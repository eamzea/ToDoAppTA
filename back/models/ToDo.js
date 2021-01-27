const { Schema, model } = require("mongoose");

const ToDoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
	},
	done: {
		type: Boolean,
	}
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

ToDoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

module.exports = model("ToDo", ToDoSchema);