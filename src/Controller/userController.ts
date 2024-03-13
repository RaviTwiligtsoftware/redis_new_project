import { Request, Response } from "express";
import { userService } from "../Services/userServices";
import * as redis from "redis";
import { RedisClientType } from "redis";
import { promisify } from "util";

// Create a Redis client
const redisClient: RedisClientType = redis.createClient();
redisClient.connect();

// Handle Redis client errors
redisClient.on("error", (err: Error) => {
  console.error("Error connecting to Redis:", err);
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    console.log("User:", user);
    // Clear the cache after creating a user
    await redisClient.del("users");
    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const cachedUsers = await redisClient.get("users");

    if (cachedUsers) {
      console.log("data from redis");

      res.status(200).json(JSON.parse(cachedUsers));
    } else {
      console.log("data from Database");
      const users = await userService.getUsers();
      await redisClient.setEx("users", 10, JSON.stringify(users));
      res.status(200).json(users);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  console.log("Controller getBy Id", req);

  try {
    const userId = parseInt(req.params.id);
    console.log("userIddddddddddddddddddd:", userId);

    const user = await userService.getUserById(userId);
    console.log("user:", user);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const updatedUser = await userService.updateUser(userId, req.body);
    await redisClient.del("users");
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    console.log("userId:", userId);

    await userService.deleteUser(userId);
    await redisClient.del("users");
    res.status(204).send("The User Deleted Succefully");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { redisClient };
