import Elysia, { NotFoundError, t } from "elysia";
import { getTodo, getSingleTodo, addTodo, editTodo } from "../service/todo.service";

export const todo = new Elysia().group("/todo", (app) =>
  app
    .get("/", () => {
      return getTodo();
    })
    .get("/:id", ({ params: { id } }) => {
      return getSingleTodo(id);
    })
    .post("/", ({ body: { todo_title, todo_categories } }) => addTodo(todo_title, todo_categories), {
      body: t.Object({
        todo_title: t.String({ minLength: 3 }),
        todo_categories: t.String({ minLength: 3 }),
      }),
    })
    .patch(
      "/:id",
      ({ params: { id }, body: { todo_title, todo_categories } }) => editTodo(id, todo_title, todo_categories),
      {
        body: t.Object({
          todo_title: t.String({ minLength: 3 }),
          todo_categories: t.String({ minLength: 3 }),
        }),
      }
    )
);
