const faker = require('faker');

const createAction = () => ({
  project_id: faker.random.number({
    min: 1,
    max: 4
  }),
  description: faker.lorem.words(3),
  notes: faker.lorem.sentences(3)
});

const buildActions = (count = 40) =>
  Array(count)
    .fill(null)
    .map(i => createAction());

exports.seed = function(knex) {
  return knex('actions').insert(buildActions());
};
