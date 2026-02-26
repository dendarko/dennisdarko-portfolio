import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemaTypes";
import { singletonDeskStructure } from "./plugins/singletonDeskStructure";

export default defineConfig({
  name: "default",
  title: "Dennis Darko Portfolio CMS",
  projectId: "vllfiv7k",
  dataset: "production",
  plugins: [deskTool({ structure: singletonDeskStructure }), visionTool()],
  schema: {
    types: schemaTypes
  }
});