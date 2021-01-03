const Redis = require("ioredis");
export default new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});
