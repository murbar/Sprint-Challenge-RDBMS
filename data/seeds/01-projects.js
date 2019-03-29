exports.seed = function(knex) {
  return knex('projects').insert([
    { name: 'Side Project', description: 'Side project for portfolio.' },
    { name: 'Sprint Challenge', description: 'Sprint challenge for RDBMS and SQL.' },
    { name: 'Plan vacation' },
    { name: 'Write novel' }
  ]);
};
