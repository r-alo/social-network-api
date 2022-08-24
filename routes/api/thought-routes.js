const router = require('express').Router();
const { User, Thought } = require('../../models');

// Get all thoughts
router.get('/', async (req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

// Get thought by Id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const thought = await Thought.findOne({_id: id});
  res.json(thought);
});

// Create thought
router.post('/', async (req, res) => {
  const reaction = {
    reactionBody: req.body.thoughtText,
    username: req.body.username,
  }
  const thoughtData = { ...req.body, reactions: [reaction] };
  console.log(thoughtData);

  const createThought = await Thought.create(thoughtData);

  await User.findOneAndUpdate(
    { _id: req.body.userId },
    { $addToSet: { thoughts: createThought._id } },
    { runValidators: true, new: true }
  );

  res.json(createThought);
});

// Update thought by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedthought = await Thought.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { runValidators: true, new: true })
  res.json(updatedthought);
});

// Delete thought by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedThought = await Thought.findOneAndDelete({_id: id});
  res.json(deletedThought);
});

// Create reaction via thought id
router.post('/:thoughtId/reactions', async (req, res) => {
  const { thoughtId } = req.params;
  const createReactions = await Thought.findOneAndUpdate(
    { _id: thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true },
  );
  res.json(createReactions);
});

//Delete reaction from thought id
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  const deletedThought = await Thought.findOneAndUpdate(
    { _id: thoughtId },
    { $pull: { reactions: { reactionId: reactionId } } }
  );
  res.json(deletedThought);
});

module.exports = router;