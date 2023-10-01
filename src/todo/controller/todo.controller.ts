import Elysia, { t } from "elysia";
import { getTodo, getSingleTodo, addTodo, editTodo, deleteTodo } from "../service/todo.service";

export const todo = new Elysia().group("/todo", (app) =>
  app
    .get("/", ({ query: { categories } }) => getTodo(categories), {
      query: t.Object({
        categories: t.String({
          default: false,
        }),
      }),
    })
    .get("/:id", ({ params: { id }, query: { categories } }) => getSingleTodo(id, categories), {
      query: t.Object({
        categories: t.String({
          default: false,
        }),
      }),
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
    .delete("/:id", ({ params: { id } }) => {
      return deleteTodo(id);
    })
);
