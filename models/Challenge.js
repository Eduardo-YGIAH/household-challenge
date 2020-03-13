const mongoose = require('mongoose');
const { taskSchema } = require('./Tasks')
const Schema = mongoose.Schema;

let challengeSchema = new Schema(
  {
    startDate: {
      type: Date, 
      default: undefined,
    },
    endDate: {
      type: Date,
      default: undefined,
    },
    householdId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Household'
    },
    tasks: [taskSchema]
  },
  {
    timestamps: true,
  },
);

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = {
  Challenge,
  challengeSchema
}
