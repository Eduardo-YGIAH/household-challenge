const { Task } = require('../models/Tasks');
const User = require('../models/User');
const Household = require('../models/Household');
const { Challenge } = require('../models/Challenge');

exports.create_task = async (req, res) => {
  try {
    const { title, description, todos, points, challengeId } = req.body;
    const task = new Task({
      title,
      description,
      todos,
      points,
    });
    console.log(task);
    await task.save();
    const challenge = await Challenge.findByIdAndUpdate({ _id: challengeId }, { $push: { tasks: task } });
    await challenge.save();
    const household = await Household.findOneAndUpdate({ _id: req.user.isOwner[0]._id }, { challenges: challenge });
    // const household = await Household.findById({ _id: req.user.isOwner[0]._id });
    // // await household.save();
    // await User.replaceOne({ _id: req.user._id }, { isOwner: [household] });
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { isOwner: household });
    // await user.save();
    const token = req.token;
    res.status(201).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.get_task = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({
      _id,
      challengeId: req.body.challengeId,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.all_tasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    if (!tasks) {
      return res.status(404).send();
    }
    res.send({ tasks });
  } catch (error) {
    // console.log(error)
    res.status(500).send(error);
  }
};

exports.update_task = async (req, res) => {
  const { title, description, checkListItems, taskValue, image } = req.body;
  try {
    await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        challengeId: req.body.challengeId,
      },
      {
        $set: {
          title,
          description,
          checkListItems,
          taskValue,
          image,
        },
      },
    );
    console.log(req.body);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.delete_task = async (req, res) => {
  try {
    const deleteTask = await Task.findOneAndDelete({
      _id: req.params.id,
      challengeId: req.body.challengeId,
    });

    if (!deleteTask) {
      res.status(404).send();
    }
    res.send(deleteTask);
  } catch (error) {
    res.status(500).send(error);
  }
};
