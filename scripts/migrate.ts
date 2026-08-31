import { config } from "dotenv";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "pg";

config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not configured.");

  const client = new Client({
    connectionString,
    ssl: /neon\.tech|sslmode=require/i.test(connectionString) ? { rejectUnauthorized: false } : undefined
  });

  await client.connect();
  try {
    const migration = await readFile(path.join(process.cwd(), "src/db/migrations/0001_portal_auth.sql"), "utf8");
    await client.query(migration);
    console.log("Portal authentication tables are ready.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

