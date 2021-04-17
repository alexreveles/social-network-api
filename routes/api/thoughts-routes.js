const router = require('express').Router();
const {
  getThought,
  getThoughtById,
  updateThought,  
  addThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughts-controller');

// /api/thought/
router.route('/')
.get(getThought)
.post(addThought)

router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought)


// /api/comments/<pizzaId>/<commentId>
router
.route('/:thoughtId/reaction')
.post(addReaction)
  

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:thoughtId/reaction/:reactionId')
.delete(removeReaction);

module.exports = router;