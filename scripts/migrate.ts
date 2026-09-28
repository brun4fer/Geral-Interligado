import { config } from "dotenv";
import { readFile, readdir } from "node:fs/promises";
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
    const migrationsDirectory = path.join(process.cwd(), "src/db/migrations");
    const migrations = (await readdir(migrationsDirectory))
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const file of migrations) {
      const migration = await readFile(path.join(migrationsDirectory, file), "utf8");
      await client.query(migration);
      console.log(`Applied ${file}.`);
    }
    console.log("Portal database is ready.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
