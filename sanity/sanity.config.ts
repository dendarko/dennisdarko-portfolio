import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemaTypes";
import { singletonDeskStructure } from "./plugins/singletonDeskStructure";

export default defineConfig({
  name: "default",
  title: "Dennis Darko Portfolio CMS",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "your_project_id",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [deskTool({ structure: singletonDeskStructure }), visionTool()],
  schema: {
    types: schemaTypes
  }
});
