const express = require('express');
const projects = require('./routes/projects');
const actions = require('./routes/actions');

const server = express();

server.use(express.json());
server.use('/api/projects', projects);
server.use('/api/actions', actions);

const port = 4000;

server.listen(port, () => {
  console.log(`\n--- Server listening on http://localhost:${port} ---\n`);
});
