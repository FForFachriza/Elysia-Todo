import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { todo } from "./todo/controller/todo.controller";

const app = new Elysia()
  .use(swagger())
  .use(todo)
  .guard({
    response: t.String(),
  })
  .get("/", () => "1")
  .get("/ping", () => "pong")
  .get("/id/:id", ({ params: { id } }) => `napain ${id}`)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
