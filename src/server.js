'use strict';
import routes from './api';

const Hapi = require('hapi');
require('dotenv').config()
import redis from './services/redis'


redis.on("connect", () => {
    console.log('Redis connected   ')
})

redis.on("error", () => {
    console.log('Error connecting to redis')
})

// Create a server with a host and port
const server = Hapi.server({
    host: "0.0.0.0",
    port: 8001
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
