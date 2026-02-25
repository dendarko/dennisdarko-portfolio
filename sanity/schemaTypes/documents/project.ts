import { defineField, defineType } from "sanity";

const stageOptions = ["Python", "Data Science", "Machine Learning", "ML Engineering", "MLOps", "LLMOps"];
const categoryOptions = ["Python", "Data Science", "Machine Learning", "MLOps", "LLMOps/RAG", "Evaluation", "Analytics"];
const proofOptions = ["Docker", "CI", "Tests", "Monitoring", "API", "Infra"];
const stackCategoryOptions = ["Backend", "Frontend", "Infra", "ML", "LLM", "Data", "Observability", "DevOps"];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "stage",
      title: "Stage",
      type: "string",
      options: { list: stageOptions.map((value) => ({ title: value, value })) },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "date", title: "Date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "impact", title: "Impact", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({
      name: "highlights",
      title: "Highlights (3 outcomes)",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(3).max(3)
    }),
    defineField({
      name: "stack",
      title: "Stack",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: { list: stackCategoryOptions.map((value) => ({ title: value, value })) },
              validation: (Rule) => Rule.required()
            })
          ],
          preview: {
            select: { title: "name", subtitle: "category" }
          }
        }
      ]
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string", options: { list: categoryOptions.map((value) => ({ title: value, value })) } }]
    }),
    defineField({
      name: "proof",
      title: "Proof Chips",
      type: "array",
      of: [{ type: "string", options: { list: proofOptions.map((value) => ({ title: value, value })) } }]
    }),
    defineField({ name: "repo", title: "GitHub Repo Name", type: "string", description: "Example: enterprise-rag-llm-system" }),
    defineField({ name: "externalUrl", title: "External URL", type: "url" }),
    defineField({ name: "demoUrl", title: "Demo URL", type: "url" }),
    defineField({
      name: "architectureImage",
      title: "Architecture Image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "caption", title: "Caption", type: "string" }]
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "caption", title: "Caption", type: "string" },
            { name: "projectSlug", title: "Project Slug Link (optional)", type: "string" }
          ]
        }
      ]
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "object",
      fields: [
        defineField({ name: "latencyMs", title: "Latency (ms)", type: "number" }),
        defineField({ name: "costPer1kTokensUsd", title: "Cost / 1k tokens (USD)", type: "number" }),
        defineField({ name: "accuracyOrScore", title: "Accuracy / Score", type: "string" }),
        defineField({ name: "evalNotes", title: "Evaluation Notes", type: "text", rows: 3 })
      ]
    }),
    defineField({ name: "caseStudy", title: "Has Case Study Page", type: "boolean", initialValue: false }),
    defineField({ name: "body", title: "Case Study Body", type: "portableText" }),
    defineField({ name: "nextImprovements", title: "What I'd Improve Next", type: "text", rows: 4 }),
    defineField({
      name: "recruiterNotes",
      title: "Recruiter Notes (recruiter page only)",
      type: "text",
      rows: 3
    }),
    defineField({ name: "relevanceScore", title: "Relevance Score", type: "number", initialValue: 50 })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "stage",
      media: "architectureImage"
    }
  }
});

export default project;
