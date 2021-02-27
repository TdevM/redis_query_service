'use strict';
import routes from './api';

const Hapi = require('hapi');
require('dotenv').config()
import redis from './services/redis'


redis.on("connect", () => {
    console.log('Redis connected')
})

// Create a server with a host and port
const server = Hapi.server({
    host: "127.0.0.1",
    port: 5000
});


server.route(routes);

// Start the server
async function start() {

    try {
        await server.start();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
