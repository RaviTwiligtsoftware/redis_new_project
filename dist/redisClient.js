"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAsync = exports.redisClient = void 0;
const redis_1 = __importDefault(require("redis"));
const util_1 = require("util");
const redisClient = redis_1.default.createClient();
exports.redisClient = redisClient;
console.log("redisClient:", redisClient);
redisClient.connect();
// Promisify the get method of the Redis client
const getAsync = (0, util_1.promisify)(redisClient.get).bind(redisClient);
exports.getAsync = getAsync;
