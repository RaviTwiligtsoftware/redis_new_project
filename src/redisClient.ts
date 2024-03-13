import redis from "redis";
import { promisify } from "util";

const redisClient = redis.createClient();
console.log("redisClient:",redisClient);
redisClient.connect();





// Promisify the get method of the Redis client
const getAsync = promisify(redisClient.get).bind(redisClient);

export { redisClient, getAsync };
