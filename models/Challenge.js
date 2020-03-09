var mongoose = require('mongoose');

var challengedSchema = new mongoose.Schema(
  {
    task: {
      type: [taskSchema],
      default: undefined,
    },
    startDate: {
      type: Date,
      default: undefined,
    },
    endDate: {
      type: Date,
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
);

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
