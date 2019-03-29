const express = require('express');
const db = require('../data/db');

const router = express.Router();

const isValidAction = action => action.description && action.project_id;

router.get('/', async (req, res) => {
  try {
    const actions = await db.actions.getAll();
    res.status(200).json(actions);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: 'Cannot get actions.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const action = await db.actions.getById(id);
    if (!action) {
      res.status(404).json({ error: 'No action with that ID.' });
    } else {
      res.status(200).json(action);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: 'Cannot get action.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body: action } = req;
    if (!isValidAction(action)) {
      res
        .status(400)
        .json({ error: 'Please provide a description and project_id for the action.' });
    } else {
      const newAction = await db.actions.create(action);
      res.status(201).json(newAction);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot create action.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body: actionUpdates } = req;
    if (!isValidAction(actionUpdates)) {
      res
        .status(400)
        .json({ error: 'Please provide a description and project_id for the action.' });
    } else {
      const updatedCount = await db.actions.update(id, actionUpdates);
      if (!updatedCount) {
        res.status(404).json({ error: 'The action with the specified ID does not exist.' });
      } else {
        res.status(204).end();
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: 'Cannot update action.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await db.actions.del(id);
    if (!deletedCount) {
      res.status(404).json({ error: 'The action with the specified ID does not exist.' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: 'Cannot delete action.' });
  }
});

module.exports = router;
