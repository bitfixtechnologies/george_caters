import { createClient } from "@sanity/client";
import fs from "fs";

const token = process.env.SANITY_API_WRITE_TOKEN || process.argv[2];

if (!token) {
  console.error("Please provide a SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId: "u1mx3eth",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: token,
  useCdn: false,
});

async function importData() {
  const fileContent = fs.readFileSync("./scripts/importSanityData.ndjson", "utf-8");
  const lines = fileContent.split("\n").filter(Boolean);

  console.log(`Importing ${lines.length} documents into Sanity...`);

  const transaction = client.transaction();
  for (const line of lines) {
    const doc = JSON.parse(line);
    transaction.createOrReplace(doc);
  }

  const result = await transaction.commit();
  console.log("SUCCESS! All 4 blog posts and authors imported into Sanity successfully!");
}

importData().catch((err) => {
  console.error("Import error:", err);
  process.exit(1);
});
