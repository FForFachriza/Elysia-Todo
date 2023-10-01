import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { todoController } from "./todo/controller/todo.controller";
import { categoriesController } from "./categories/controller/categories.controller";

const app = new Elysia()
  .use(
    swagger({
      autoDarkMode: false,
    })
  )
  .use(todoController)
  .use(categoriesController)
  .guard({
    response: t.String(),
  })
  .get("/", () => "1")
  // .get("/example", ({ query }) => {
  //   const { name, age } = query;
  //   return `Hello ${name}! You are ${age} years old.`;
  // })

  .get("/ping", () => `pong!\n${new Date().toLocaleTimeString()}`)
  .get("/id/:id", ({ params: { id } }) => `napain ${id}`)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
