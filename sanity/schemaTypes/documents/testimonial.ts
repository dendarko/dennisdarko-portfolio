import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "company"
    }
  }
});

export default testimonial;
