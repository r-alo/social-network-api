const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
  res.json({});
});

module.exports = router;