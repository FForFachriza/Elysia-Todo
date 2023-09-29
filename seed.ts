import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todos: string[] = ["withdrawal Soft", "Riau Dynamic", "Mauritius up Decentralized", "Kenyan"];
const categories: string[] = ["PEKERJAAN", "TUGAS", "DAN LAIN LAIN"];

const allData = todos.map((todo) => {
  return prisma.todo.create({
    data: {
      todo_title: todo,
    },
  });
});

// const allData = categories.map((categorie) => {
//     return prisma.categories.create({
//       data: {
//         categories: categorie,
//       },
//     });
//   });

await Promise.all(allData);
