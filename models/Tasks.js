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

taskSchema.virtual('tasks', {
  ref: 'Challenges',
  localField: '_id',
  foreignField: 'tasks',
});

taskSchema.plugin(require('mongoose-autopopulate'));

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
