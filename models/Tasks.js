const mongoose = require('mongoose');

let taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: undefined,
      required: true
    },
    description: {
      type: String,
      default: undefined,
      requied: true
    },
    checkListItems: {
      type: Array,
      default: undefined
    },
    taskValue: {
      type: Number,
      default: 0,
      min: 0,
      max: 20,    /* this can be changed */
      required: true
    },
    image: {
      data: Buffer,
      contentType: String
    },
    challengeId: {
      type: mongoose.Types.ObjectId,
      requied: true,
      ref: 'Challenge'
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = {
  Task,
  taskSchema
}
