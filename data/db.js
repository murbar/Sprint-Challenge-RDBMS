const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);
const projectsTable = 'projects';
const actionsTable = 'actions';

const getRecords = tableName => async () => {
  const records = await db(tableName);
  return records;
};

const getRecordById = tableName => async id => {
  const record = await db(tableName)
    .where({ id })
    .first();
  return record;
};

const addRecord = tableName => async record => {
  const [newRecordId] = await db(tableName).insert(record);
  const newRecord = await db(tableName).where({ id: newRecordId });
  return newRecord;
};

const updateRecord = tableName => async (id, record) => {
  const updatedCount = await db(tableName)
    .where({ id })
    .update(record);
  return updatedCount;
};

const deleteRecord = tableName => async id => {
  const deletedCount = await db(tableName)
    .where({ id })
    .del();
  return deletedCount;
};

const getProjectById = async id => {
  const getProject = getRecordById(projectsTable);
  const project = await getProject(id);

  if (!project) return null;

  project.actions = await db(actionsTable).where({ project_id: project.id });
  return project;
};

module.exports = {
  projects: {
    getAll: getRecords(projectsTable),
    getById: getProjectById,
    create: addRecord(projectsTable),
    update: updateRecord(projectsTable),
    del: deleteRecord(projectsTable)
  },
  actions: {
    getAll: getRecords(actionsTable),
    getById: getRecordById(actionsTable),
    create: addRecord(actionsTable),
    update: updateRecord(actionsTable),
    del: deleteRecord(actionsTable)
  }
};
