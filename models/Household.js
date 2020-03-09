var mongoose = require('mongoose');

var householdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    challenge: {
      type: [challengeSchema],
      default: undefined,
    },
  },
  {
    timestamps: true,
  },
);

const Household = mongoose.model('Household', householdSchema);

module.exports = Household;
