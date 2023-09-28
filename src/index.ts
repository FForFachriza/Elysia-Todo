import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(swagger())
  .guard({
    response: t.String(),
  })
  .get("/", () => "1")
  .get("/ping", () => "pong")
  .get("/id/:id", ({ params: { id } }) => `napain ${id}`)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
