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
  const createThought = await Thought.create(req.body);
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
  const createThought = await Thought.create(req.body);
  res.json(createThought);
});

router.delete('/:thoughtId/reactions', async (req, res) => {
  const { id } = req.params;
  const thought = await Thought.findOne({_id: id});
  res.json(thought);
});

module.exports = router;