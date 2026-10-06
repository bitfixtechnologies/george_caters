import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "u1mx3eth";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/studio",
  name: "george_foods_studio",
  title: "George Foods & Caters Studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema,
});
