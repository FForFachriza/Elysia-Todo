import { PrismaClient } from "@prisma/client";
import { NotFoundError } from "elysia";

const prisma = new PrismaClient();

const todoHandler = (todo: string): boolean => {
  let showTodo = false;

  switch (todo) {
    case "true":
      showTodo = true;
      break;
    case "false":
      showTodo = false;
      break;
    default:
      break;
  }

  return showTodo;
};

export const getCategories = async (todo: string) => {
  const showTodo = todoHandler(todo);

  const data = await prisma.categories.findMany({
    include: {
      categories_todo: showTodo,
    },
  });

  return {
    message: "Success Get Categories",
    data,
  };
};

export const getSingleCategories = async (todo: string, id: string) => {
  const showTodo = todoHandler(todo);

  const data = await prisma.categories.findUnique({
    where: {
      id: id,
    },
    include: {
      categories_todo: showTodo,
    },
  });

  if (!data) {
    throw new NotFoundError();
  }

  return {
    message: "Succes Get Single Categories",
    data,
  };
};

export const addCategories = async (categories: string) => {
  const data = await prisma.categories.create({
    data: {
      categories: categories,
    },
  });

  return {
    message: "Success Add Categories",
    data,
  };
};

export const editCategories = async (categories: string, id: string) => {
  const isCategories = await prisma.categories.findUnique({
    where: { id: id },
  });

  if (!isCategories) {
    throw new NotFoundError();
  }

  const data = await prisma.categories.update({
    where: {
      id: id,
    },
    data: {
      categories: categories,
    },
  });

  return {
    message: "Success Edit Categories",
    data,
  };
};

export const deleteCategories = async (id: string) => {
  const data = await prisma.categories.delete({
    where: {
      id: id,
    },
  });

  return {
    message: "Success Delete Categories",
    data,
  };
};
