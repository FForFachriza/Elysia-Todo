import { PrismaClient } from "@prisma/client";
import { NotFoundError, InternalServerError } from "elysia";

const prisma = new PrismaClient();

export const getTodo = async (categories: string) => {
  let showCategories = false;

  switch (categories) {
    case "true":
      showCategories = true;
      break;
    case "false":
      showCategories = false;
      break;
    default:
      break;
  }

  const data = await prisma.todo.findMany({
    include: {
      todo_categories: showCategories,
    },
  });

  return {
    message: "Success Get Todo",
    data,
  };
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

  return {
    message: "Success Get Single Todo",
    data,
  };
};

export const addTodo = async (title: string, categories: string) => {
  try {
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

    return {
      message: "Success Add Todo",
      data,
    };
  } catch (error) {
    throw new InternalServerError();
  }
};

export const editTodo = async (id: string, title?: string, categories?: string) => {
  try {
    const existingCategory = await prisma.categories.findUnique({
      where: {
        categories: categories,
      },
    });

    console.log(existingCategory);

    if (!existingCategory) {
      throw new NotFoundError("Categories Tidak Ditemukan");
    }

    const data = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        todo_title: title,
        todo_categories: {
          connect: {
            categories: categories,
          },
        },
      },
    });

    return {
      message: "Success Edit Todo",
      data,
    };
  } catch (error) {
    console.log(error);
    throw new InternalServerError();
  }
};

export const deleteTodo = async (id: string) => {
  const data = await prisma.todo.delete({
    where: {
      id: id,
    },
  });

  if (!data) {
    throw new NotFoundError();
  }

  return {
    message: "Success Delete Todo",
    data,
  };
};
