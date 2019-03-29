const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await db.projects.getAll();
    res.status(200).json(projects);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: 'Cannot get projects.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await db.projects.getById(id);
    if (!project) {
      res.status(404).json({ error: 'No project with that ID.' });
    } else {
      res.status(200).json(project);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: 'Cannot get project.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body: project } = req;
    if (!project.name) {
      res.status(400).json({ error: 'Please provide a name for the project.' });
    } else {
      const newProject = await db.projects.create(project);
      res.status(201).json(newProject);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot create project.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body: projectUpdates } = req;
    if (!projectUpdates.name) {
      res.status(400).json({ error: 'Please provide a name for the project.' });
    } else {
      const updatedCount = await db.projects.update(id, projectUpdates);
      if (!updatedCount) {
        res.status(404).json({ error: 'The project with the specified ID does not exist.' });
      } else {
        res.status(204).end();
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: 'Cannot update project.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCount = await db.projects.del(id);
    if (!deletedCount) {
      res.status(404).json({ error: 'The project with the specified ID does not exist.' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: 'Cannot delete project.' });
  }
});

module.exports = router;
