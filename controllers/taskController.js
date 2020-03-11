const Task = require('../models/Tasks');

exports.create_task = async (req, res) => {
	const task = new Task({
		...req.body,
		_challengeId: req.challenge._id
	});

	try {
		await task.save();
		res.status(201).send({ task });
	} catch (error) {
		res.staus(400).send(error);
	}
};

exports.get_task = async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOne({ 
			_id, _challengeId: req.challenge.id 
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
		const allTasks = await Task.findAll({});

		if(!allTasks) {
			return res.status(404).send();
		}
		res.send(allTasks);
	} catch (error) {
		res.status(500).send(error);
	}
}

exports.update_task = async (req, res) => {
	const { title, description, checkListItems, taskValue, image } = req.body.data;
	try {
		await Task.finedOneAndUpdate(
			{ 
				_id: req.params.id,
				_userId: req.user.id
			},
			{ $set: {
					title, 
					description,
					checkListItems,
					taskValue,
					image
				} 
			}
		);
		res.status(200).send();
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.delete_task = async (req, res) => {
  try {
    const removeTask = await Task.findOneAndDelete(
			{ 
				_id: req.params.id,
				_challengeId: req.challenge._id
			}
		);

    if (!removeTask) {
      res.status(404).send();
    }

    res.send(removeTask);
  } catch (error) {
    res.status(500).send(error);
  }
};