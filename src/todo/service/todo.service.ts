import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";

const prisma = new PrismaClient();

export const getTodo = async () => {
  const data = await prisma.todo.findMany();

  return data;
};

export const getSingleTodo = async (id: string) => {
  const data = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) {
    throw new NotFoundError();
  }

  return data;
};

export const addTodo = async (title: string, categories: any) => {
  const data = await prisma.todo.create({
    data: {
      todo_title: title,
      todo_categories: {
        connectOrCreate: {
          create: {
            categories: categories,
          },
          where: {
            categories: categories,
          },
        },
      },
    },
  });

  return data;
};
