const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
    },
    points: {
      type: Number,
      min: 0,
      max: 20 /* this can be changed */,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task,
  taskSchema,
};
