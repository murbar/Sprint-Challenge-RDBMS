exports.up = function(knex) {
  return knex.schema.createTable('actions', function(tbl) {
    tbl.increments();
    tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects');
    tbl
      .string('description')
      .notNullable()
      .unique();
    tbl.text('notes');
    tbl.boolean('is_complete');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('actions');
};
