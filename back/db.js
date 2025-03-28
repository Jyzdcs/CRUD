import pg from "pg";

const { Client } = pg;
const client = new Client({
  user: "famasito",
  host: "localhost",
  database: "mydatabase",
  password: "kylian",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("✅ Connecté à PostgreSQL"))
  .catch((err) => console.error("❌ Erreur de connexion", err));

export default client;
