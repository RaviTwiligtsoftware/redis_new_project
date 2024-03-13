"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controller/userController");
const router = express_1.default.Router();
router.post("/create", userController_1.createUser);
router.get("/get", userController_1.getUsers);
router.get("/getById/:id", userController_1.getUserById);
router.put("/:id", userController_1.updateUser);
router.delete("/:id", userController_1.deleteUser);
exports.default = router;
