const Household = require('../models/Household.js');
const User = require('../models/User.js');

exports.create_household = async (req, res) => {
  try {
    const { title, owner } = req.body.isOwner[0];
    const household = new Household({ title, owner });
    await household.save();
    const user = await User.findById({ _id: req.user.id });
    user.isOwner.push(household._id);
    await user.save();
    await User.findOne({ _id: req.user._id })
      .populate('isOwner')
      .exec(function(err, user) {
        if (err) {
          res.status(500).send(err);
        } else {
          const token = req.token;
          res.status(201).send({ user, token });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.get_household = async (req, res) => {
  try {
    const household = await Household.findOne({ owner: req.user._id });
    if (!household) {
      await User.findOne({ _id: req.user._id })
        .populate('isMemberOf')
        .exec(function(err, userHousehold) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(userHousehold);
          }
        });
    } else {
      await User.findOne({ _id: req.user._id })
        .populate('isOwner')
        .exec(function(err, userHousehold) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.send(userHousehold);
          }
        });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.join_household = async (req, res) => {
  try {
    const household = await Household.findById({ _id: req.params.id });
    const joinError = household.members.includes(req.user._id);

    if (!joinError && household.owner !== req.user._id) {
      household.members.push(req.user._id);
      await household.save();
      console.log(household);
      const user = await User.findById({ _id: req.user._id });
      user.isMemberOf.push(household._id);
      await user.save();
      await User.findById({ _id: req.user._id })
        .populate('isMemberOf')
        .exec(function(err, userHousehold) {
          if (err) {
            res.status(500).send('Oops, something went wrong', err);
          } else {
            res.status(200).send(userHousehold);
          }
        });
    } else {
      res.status(405).send(err);
    }
  } catch (error) {
    res.send(error);
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
