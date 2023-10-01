import Elysia, { t } from "elysia";
import { addCategories, getCategories, getSingleCategories } from "../service/categories.service";

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
      .post("/", ({ body: {categories_title} }) => addCategories(categories_title), {
        body: t.Object({
          categories_title: t.String({
            minLength: 3,
          }),
        }),
      })
  );
