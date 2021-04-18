const { Users } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    Users.find({})
      .populate({
        path: 'Thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  

  // get one User by id
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: 'Thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  

  // createUser
  createUser({ body }, res) {
    Users.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
   // createFriend
   createFriend({ body, params }, res) {
       console.log(params)
    Users.findOneAndUpdate({_id: params.userId}, {$addToSet: {friends: params.friendId}}, {new: true})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  // deleteFriend
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate({ _id: params.userId }, {$pull: {friends: params.friendId}}, {new: true})
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
};

module.exports = userController;
