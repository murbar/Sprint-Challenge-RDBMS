const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const addRecord = async (tableName, record) => {
  const [newRecordId] = await db(tableName).insert(record);
  const newRecord = await db(tableName).where({ id: newRecordId });
  return newRecord;
};

const getRecordById = async (tableName, id) => {
  const record = await db(tableName)
    .where({ id })
    .first();
  return record;
};

async function getProjectById(id) {
  const project = await getRecordById('projects', id);
  project.actions = await db('actions').where({ project_id: project.id });
  return project;
}

const addProject = async project => addRecord('projects', project);

const addAction = async action => addRecord('actions', action);

module.exports = {
  getProjectById,
  addProject,
  addAction
};
