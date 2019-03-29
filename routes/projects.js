const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { body: project } = req;
    if (!project.name) {
      res.status(400).json({ error: 'Please provide a name for the project.' });
    } else {
      const [newProjectId] = await db.addProject(project);
      const newProject = await db.getProjectById(newProjectId);
      res.status(201).json(newProject);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Cannot create project.' });
  }
});

module.exports = router;
