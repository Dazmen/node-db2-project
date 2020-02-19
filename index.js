const express = require('express');
const carRouter = require('./carRouter.js');
const server = express();

server.use(express.json());
server.use('/api/cars', carRouter);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
});