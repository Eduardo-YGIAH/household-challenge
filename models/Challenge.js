const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let challengeSchema = new Schema(
  {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task', autopopulate: true }],
  },
  {
    timestamps: true,
  },
);

challengeSchema.virtual('challenges', {
  ref: 'Household',
  localField: '_id',
  foreignField: 'challenges',
});

challengeSchema.plugin(require('mongoose-autopopulate'));

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
