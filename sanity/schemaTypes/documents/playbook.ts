import { defineField, defineType } from "sanity";

export const playbook = defineType({
  name: "playbook",
  title: "Playbook",
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
    defineField({ name: "date", title: "Published Date", type: "date" }),
    defineField({ name: "updatedAt", title: "Updated At", type: "datetime" }),
    defineField({ name: "audience", title: "Audience", type: "string" }),
    defineField({ name: "checklistLength", title: "Checklist Length", type: "number" }),
    defineField({ name: "body", title: "Body", type: "portableText", validation: (Rule) => Rule.required() })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "updatedAt"
    }
  }
});

export default playbook;
