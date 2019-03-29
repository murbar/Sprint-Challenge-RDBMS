const express = require('express');
const db = require('../data/db');

const router = express.Router();

const isValidAction = action => action.description && action.project_id;

router.post('/', async (req, res) => {
  try {
    const { body: action } = req;
    if (!isValidAction(action)) {
      res
        .status(400)
        .json({ error: 'Please provide a description and project_id for the action.' });
    } else {
      const [newActionId] = await db.addAction(action);
      const newAction = await db.getActionById(newActionId);
      res.status(201).json(newAction);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot create action.' });
  }
});

module.exports = router;
