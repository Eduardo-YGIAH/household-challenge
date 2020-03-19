const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let householdSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'A name is required'],
      trim: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: false,
    },
    challenges: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'Challenge',
          autopopulate: true,
        },
      ],
      default: [],
    },
    members: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: 'User',
          autopopulate: true,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

householdSchema.plugin(require('mongoose-autopopulate'));

const Household = mongoose.model('Household', householdSchema);

module.exports = Household;
