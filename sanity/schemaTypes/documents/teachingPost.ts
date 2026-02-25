import { defineField, defineType } from "sanity";

export const teachingPost = defineType({
  name: "teachingPost",
  title: "Teaching Post",
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
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "date", title: "Published Date", type: "date", validation: (Rule) => Rule.required() }),
    defineField({ name: "topics", title: "Topics", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      options: { list: ["Beginner", "Intermediate", "Advanced"] }
    }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body", type: "portableText", validation: (Rule) => Rule.required() })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "heroImage"
    }
  }
});
