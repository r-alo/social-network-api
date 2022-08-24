const router = require('express').Router();
const { User, Thought } = require('../../models');

//Get all users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//Get user by Id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({_id: id});
  res.json(user);
});

//Create new user
router.post('/', async (req, res) => {
  const createUser = await User.create(req.body);
  res.json(createUser);
});

// Update user by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { runValidators: true, new: true }
  )
  res.json(user);
});

//Delete user by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const findUser = await User.findOne({ _id: id });
  await User.findOneAndDelete({ _id: findUser._id });

  await Thought.find({ username: findUser.username }).remove();
  res.json(findUser);
});

// Add friend to user list
router.post('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;
  const addFriend = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { friends: friendId } },
    { runValidators: true, new: true },
  );
  res.json(addFriend);
});

//Delete friend from user list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;
  const removeFriend = await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { friends: friendId } },
    { runValidators: true, new: true },
  );
  res.json(removeFriend);
});

module.exports = router;