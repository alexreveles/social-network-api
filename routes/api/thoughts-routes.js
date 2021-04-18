const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  updateThought,  
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughts-controller');

// /api/thought/
router.route('/')
.get(getAllThought)
.post(addThought)

router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought)


// /api/thoughts/<userId>/<thoughtsId>
router
.route('/:thoughtId/reaction')
.post(addReaction);
  

// /api/thoughts/<userId>/<thoughtsId>/<reactionId>
router.route('/:thoughtId/reaction/:reactionId')
.delete(removeReaction);

module.exports = router;