const Task = require('../models/Tasks');
const User = require('../models/User');
const Household = require('../models/Household');
const Challenge = require('../models/Challenge');

exports.create_task = async (req, res) => {
  try {
    const { title, description, todos, points } = req.body;
    const task = new Task({
      title,
      description,
      todos,
      points,
    });
    await task.save();
    console.log(task);
    const household = await Household.findOne({ owner: req.user._id });

    await Challenge.findByIdAndUpdate({ _id: household.challenges[0]._id }, { $push: { tasks: task._id } });
    const user = await User.findById({ _id: req.user._id });
    const token = req.token;
    res.status(201).send({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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
