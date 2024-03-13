"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.userService = {
    async createUser(data) {
        return await prisma.user.create({ data });
    },
    async getUsers() {
        return await prisma.user.findMany();
    },
    async getUserById(id) {
        try {
            console.log("Fetching user by ID:", id);
            // const user = await prisma.user.findMany();
            return await prisma.user.findUnique({
                where: {
                    id: Number(id),
                },
            });
        }
        catch (error) {
            console.error("Error fetching user by ID:", error);
            throw new Error("Failed to fetch user by ID");
        }
    },
    async updateUser(userId, data) {
        return await prisma.user.update({
            where: { id: userId },
            data,
        });
    },
    async deleteUser(userId) {
        return await prisma.user.delete({
            where: { id: userId },
        });
    },
};
