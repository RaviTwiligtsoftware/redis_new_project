import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userService = {
  async createUser(data: any) {
    return await prisma.user.create({ data });
  },
  async getUsers() {
    return await prisma.user.findMany();
  },

  async getUserById(id:number) {
    try {
      console.log("Fetching user by ID:", id);
      // const user = await prisma.user.findMany();
      return await prisma.user.findUnique({
        where: {
          id: Number(id), 
        },
      });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to fetch user by ID");
    }
  },

  async updateUser(userId: number, data: any) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  },
  async deleteUser(userId: number) {
    return await prisma.user.delete({
      where: { id: userId },
    });
  },
};
