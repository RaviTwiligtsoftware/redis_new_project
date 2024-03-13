"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const userServices_1 = require("../Services/userServices");
const redis = __importStar(require("redis"));
// Create a Redis client
const redisClient = redis.createClient();
exports.redisClient = redisClient;
redisClient.connect();
// Handle Redis client errors
redisClient.on("error", (err) => {
    console.error("Error connecting to Redis:", err);
});
const createUser = async (req, res) => {
    try {
        const user = await userServices_1.userService.createUser(req.body);
        console.log("User:", user);
        // Clear the cache after creating a user
        await redisClient.del("users");
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const cachedUsers = await redisClient.get("users");
        if (cachedUsers) {
            console.log("data from redis");
            res.status(200).json(JSON.parse(cachedUsers));
        }
        else {
            console.log("data from Database");
            const users = await userServices_1.userService.getUsers();
            await redisClient.setEx("users", 10, JSON.stringify(users));
            res.status(200).json(users);
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    console.log("Controller getBy Id", req);
    try {
        const userId = parseInt(req.params.id);
        console.log("userIddddddddddddddddddd:", userId);
        const user = await userServices_1.userService.getUserById(userId);
        console.log("user:", user);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const updatedUser = await userServices_1.userService.updateUser(userId, req.body);
        await redisClient.del("users");
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        console.log("userId:", userId);
        await userServices_1.userService.deleteUser(userId);
        await redisClient.del("users");
        res.status(204).send("The User Deleted Succefully");
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteUser = deleteUser;
