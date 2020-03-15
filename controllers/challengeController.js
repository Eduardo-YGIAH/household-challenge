const { Challenge } = require('../models/Challenge.js');

exports.create_challenge = async (req, res) => {

	try {
		const challenge = new Challenge({
			...req.body,
			householdId: req.body.householdId
		});
		await challenge.save();
		res.status(201).send({ challenge });
	} catch (error) {
		// console.log(error);
		res.status(400).send(error);
	}
};


exports.get_challenge = async (req, res) => {
	
	try {
		const _id = req.params.id;
		const challenge = await Challenge.findOne(
			{ _id, 
				householdId: req.body.householdId
			});

		if (!challenge) {
			return res.status(404).send();
		}
    res.send(challenge);
        
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.all_challenges = async (req, res) => {
	try {
		const allChallenges = await Challenge.find({});

		if(!allChallenges) {
			return res.status(404).send();
		}
		res.send(allChallenges);
	} catch (error) {
		res.status(500).send(error);
	}
}

exports.update_challenge = async (req, res) => {
	try {
		await Challenge.findOneAndUpdate(
			{ _id: req.params.id} ,
			{ $set: req.body }
		);
		res.status(200).send();
	} catch (error) {
		// console.log(error);
		res.status(500).send(error);
	}
};

exports.delete_challenge = async (req, res) => {
  try {
    const deleteChallenge = await Challenge.findOneAndDelete({ _id: req.params.id, householdId: req.body.householdId });

    if (!deleteChallenge) {
      res.status(404).send();
    }

    res.send(deleteChallenge);
  } catch (error) {
    res.status(500).send(error);
  }
};