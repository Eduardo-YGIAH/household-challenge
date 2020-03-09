const Household = require('../models/Household.js');

exports.create_household = async (req, res) => {
  const household = new Household({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await household.save();
    res.status(201).send(household);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.get_household = async (req, res) => {
  const _id = req.params.id;

  try {
    const household = await Household.findOne({ _id, owner: req.user._id });

    if (!household) {
      return res.status(404).send();
    }

    res.send(household);
  } catch (e) {
    res.status(500).send();
  }
};

exports.delete_household = async (req, res) => {
  try {
    const household = await Household.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!household) {
      res.status(404).send();
    }

    res.send(household);
  } catch (e) {
    res.status(500).send();
  }
};
