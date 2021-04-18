const router = require('express').Router();

// import functionality
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
  } = require('../../controllers/user-controller');
  

// Set up GET all and POST at /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/user/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// set up POST and DELETE for friends
router
.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend)


module.exports = router;