const { Thoughts, Users } = require("../models");

const thoughtsController = {
  // add thought to user
  addThought({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  addReaction( {params, body }, res ) {
      console.log(body)
      console.log(params)
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
          console.log(dbUserData)
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // get all thoughts
  getAllThought(req, res) {
    Thoughts.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // get thoughts by id 
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No thought found with this ID!" });
          return;
        }

        res.json(dbThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // update thoughts
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).jason({ message: "No thought found with this ID!" });
          return;
        }

        res.json(dbThoughtsData);
      })
      .catch((err) => res.json(err));
  },

  // remove thoughts
  removeThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtsId })
      .then((deletedThoughts) => {
        if (!deletedThoughts) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtsId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // remove reactions
  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;
