const Challenge = require('../models/Challenge');

exports.create_challenge = async (req, res) => {
	try {
		const challenge = new Challenge({
			...req.body,
			householdId: req.household._id
		});
		await challenge.save();
		res.status(201).send({ challenge });
	} catch (e) {
		res.status(400).send(e);
	}
};


exports.get_challenge = async (req, res) => {
	const _id = req.params.id;

	try {
		const challenge = await Challenge.findOne({ _id, householdId: req.household._id });

		if (!challenge) {
			return res.status(404).send();
		} else {
			challenge.populate('Task');
		}

    res.send(challenge);
        
	} catch (e) {
		res.status(500).send();
	}
};

exports.all_challenges = async (req, res) => {
	try {
		const allChallenges = await Challenge.findAll({});

		if(!allChallenges) {
			return res.status(404).send();
		}
		res.send(allChallenges);
	} catch (e) {
		res.status(500).send();
	}
}

exports.update_challenge = async (req, res) => {
	try {
		await Challenge.finedOneAndUpdate(
			{ _id: req.params.id} ,
			{ $set: req.body }
		);
		res.status(200).send();
	} catch (e) {
		res.status(500).send();
	}
};

exports.delete_challenge = async (req, res) => {
  try {
    const removeChallenge = await Challenge.findOneAndDelete({ _id: req.params.id, householdId: req.household._id });

    if (!removeChallenge) {
      res.status(404).send();
    }

    res.send(removeChallenge);
  } catch (e) {
    res.status(500).send();
  }
};