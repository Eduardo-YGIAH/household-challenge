const mongoose = require('mongoose');
const { challengeSchema } = require('./Challenge')
const Schema = mongoose.Schema;

let householdSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    challenges: [challengeSchema]
  },
  {
    timestamps: true,
  },
);

const Household = mongoose.model('Household', householdSchema);

module.exports = Household;
