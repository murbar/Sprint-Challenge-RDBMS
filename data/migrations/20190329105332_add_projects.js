exports.up = function(knex) {
  return knex.schema.createTable('projects', function(tbl) {
    tbl.increments();
    tbl
      .string('name')
      .notNullable()
      .unique();
    tbl.text('description');
    tbl.boolean('is_complete').defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects');
};
