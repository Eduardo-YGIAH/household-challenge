const User = require('../models/User');
const cloudinary = require('cloudinary').v2;
require('../config/cloudinary_config');

exports.signUp = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    const token = await user.generateAuthToken();
    const id = user._id;
    if (user.isOwner.length > 0) {
      await User.findById({ _id: id })
        .populate('isOwner')
        .exec((err, user) => {
          if (err) {
            throw new Error(err);
          }
          res.send({ user, token });
        });
    } else if (user.isMemberOf.length > 0) {
      await User.findById({ _id: id })
        .populate('isMemberOf')
        .exec((err, user) => {
          if (err) {
            throw new Error(err);
          }
          res.send({ user, token });
        });
    } else {
      res.send({ user, token });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.profile = async (req, res) => {
  res.send(req.user);
};

exports.update_info = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.upload_avatar = (req, res) => {
  console.log(req);
  const file = req.files.avatar;
  cloudinary.uploader.upload(file.tempFilePath, async function(err, result) {
    const avatar_url = result.secure_url;
    const updates = Object.keys(req.files);
    const allowedUpdates = ['avatar'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid upload!' });
    }
    try {
      updates.forEach(update => (req.user[update] = avatar_url));
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
};

exports.delete_user = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
};
