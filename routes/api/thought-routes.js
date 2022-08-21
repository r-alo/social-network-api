const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
  const thoughts = await Thought.find();
  res.json(thoughts);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const thought = await Thought.findOne({_id: id});
  res.json(thought);
});

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

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedthought = await Thought.findOneAndUpdate(
    { _id: id },
    { $set: req.body },
    { runValidators: true, new: true })
  res.json(updatedthought);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedThought = await Thought.findOneAndDelete({_id: id});
  res.json(deletedThought);
});

router.post('/:thoughtId/reactions', async (req, res) => {
  const { thoughtId } = req.params;
  const createReactions = await Thought.findOneAndUpdate(
    { _id: thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true },
  );
  res.json(createReactions);
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  const deletedThought = await Thought.findOneAndUpdate(
    { _id: thoughtId },
    { $pull: { reactions: { reactionId: reactionId } } }
  );
  res.json(deletedThought);
});

module.exports = router;