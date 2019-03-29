const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

function addProject(newProject) {
  return;
}

function addAction(newAction) {
  return;
}

function getProjectById(id) {
  return;
}

module.exports = {
  addProject,
  addAction,
  getProjectById
};
