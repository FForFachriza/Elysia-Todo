import Elysia, { t } from "elysia";
import {
  addCategories,
  deleteCategories,
  editCategories,
  getCategories,
  getSingleCategories,
} from "../service/categories.service";

export const categoriesController = (app: Elysia) =>
  app.group("/categories", (app) =>
    app
      .get("/", ({ query: { todo } }) => getCategories(todo), {
        query: t.Object({
          todo: t.String({
            default: false,
          }),
        }),
      })
      .get("/:id", ({ query: { todo }, params: { id } }) => getSingleCategories(todo, id), {
        query: t.Object({
          todo: t.String({
            default: false,
          }),
        }),
      })
      .post("/", ({ body: { categories_title } }) => addCategories(categories_title), {
        body: t.Object({
          categories_title: t.String({
            minLength: 3,
          }),
        }),
      })
      .patch("/:id", ({ params: { id }, body: { categories_title } }) => editCategories(categories_title, id), {
        body: t.Object({
          categories_title: t.String({
            minLength: 3,
          }),
        }),
      })
      .delete("/:id", ({ params: { id } }) => deleteCategories(id))
  );
