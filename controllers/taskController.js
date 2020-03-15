const { Task } = require('../models/Tasks');

exports.create_task = async (req, res) => {
	const task = new Task({
		...req.body,
		challengeId: req.body.challengeId
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
			_id, challengeId: req.body.challengeId 
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

		if(!tasks) {
			return res.status(404).send();
		}
		res.send({ tasks });
	} catch (error) {
		// console.log(error)
		res.status(500).send(error);
	}
}

exports.update_task = async (req, res) => {
	const { title, description, checkListItems, taskValue, image } = req.body;
	try {
		await Task.findOneAndUpdate(
			{ 
				_id: req.params.id,
				challengeId: req.body.challengeId
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
		console.log(req.body)
		res.status(200).send();
	} catch (error) {
		console.log(error)
		res.status(500).send(error);
	}
};

exports.delete_task = async (req, res) => {
  try {
    const deleteTask = await Task.findOneAndDelete(
			{ 
				_id: req.params.id,
				challengeId: req.body.challengeId
			}
		);

    if (!deleteTask) {
      res.status(404).send();
    }
		res.send(deleteTask);
		
  } catch (error) {
    res.status(500).send(error);
  }
};