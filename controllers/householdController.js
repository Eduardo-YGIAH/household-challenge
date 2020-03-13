const Household = require('../models/Household.js');

exports.create_household = async (req, res) => {
  try {
    const household = new Household({
      ...req.body,
      owner: req.user._id,
    });
    await household.save();
    res.status(201).send({ household });
    console.log(req.users.email)
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.get_household = async (req, res) => {
  try {
    const _id = req.params.id;
    const household = await Household.findOne({ _id, owner: req.user._id });

    if (!household) {
      return res.status(404).send();
    }

    res.send(household);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.delete_household = async (req, res) => {
  try {
    const household = await Household.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!household) {
      res.status(404).send();
    }

    res.send(household);
  } catch (error) {
    res.status(500).send(error);
  }
};
