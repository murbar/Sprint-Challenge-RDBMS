const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

function getProjectById(id) {
  const project = await db('projects')
    .where({ id })
    .first();
  project.actions = await db('actions').where({ project_id: project.id });
  return project;
}

function addProject(project) {
  const [newProjectId] = await db('projects').insert(project);
  const newProject = await db('projects').where({id: newProjectId})
  return newProject;
}

function addAction(action) {
  const [newActionId] = await db('actions').insert(action);
  const newAction = await db('actions').where({id: newActionId})
  return newAction;
}

module.exports = {
  getProjectById,
  addProject,
  addAction
};
