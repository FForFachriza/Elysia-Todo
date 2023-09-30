import Elysia, { NotFoundError, t } from "elysia";
import { getTodo, getSingleTodo, addTodo } from "../service/todo.service";

export const todo = new Elysia().group(
  "/todo",
  {
    body: t.Object({
      todo_title: t.String({ minLength: 3 }),
      todo_categories: t.String({ minLength: 3 }),
    }),
  },
  (app) =>
    app
      .get("/", () => {
        return getTodo();
      })
      .get("/:id", ({ params: { id } }) => {
        return getSingleTodo(id);
      })
      .post("/", ({ body: { todo_title, todo_categories } }) => {
        return addTodo(todo_title, todo_categories);
      })
      // Todo
      // .patch("/:id", ({ body: { todo_categories, todo_title }, params: {id} }) => {
      //   return 
      // })
);

// body: t.Object({
//   todo_title: t.String({ minLength: 3 }),
//   todo_categories: t.String({ minLength: 3 }),
// }),
