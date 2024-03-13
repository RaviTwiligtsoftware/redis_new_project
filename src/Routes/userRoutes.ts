import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controller/userController";

const router = express.Router();

router.post("/create", createUser);
router.get("/get", getUsers);
router.get("/getById/:id", getUserById);

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
