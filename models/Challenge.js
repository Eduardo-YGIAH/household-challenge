const mongoose = require('mongoose');
const { taskSchema } = require('./Tasks');
const Schema = mongoose.Schema;

let challengeSchema = new Schema(
  {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    tasks: [taskSchema],
  },
  {
    timestamps: true,
  },
);

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = {
  Challenge,
  challengeSchema,
};
