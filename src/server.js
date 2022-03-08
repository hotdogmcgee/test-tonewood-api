const knex = require("knex");
const app = require("./app");
const {
  PORT,
  DATABASE_URL,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
} = require("./config.js");

const db = knex({
  client: "pg",
  connection: {
    host: DB_HOST,
    name: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    ssl: true,
  },
});

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
