import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "headline", title: "Headline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "url", title: "Canonical Site URL", type: "url", validation: (Rule) => Rule.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (Rule) => Rule.required().email() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "links",
      title: "Links",
      type: "object",
      fields: [
        defineField({ name: "github", title: "GitHub", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" })
      ]
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }]
    }),
    defineField({
      name: "resumeFile",
      title: "Resume File",
      type: "file",
      options: { accept: ".pdf" }
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured Projects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }]
    }),
    defineField({
      name: "announcement",
      title: "Announcement",
      type: "object",
      fields: [
        defineField({ name: "enabled", title: "Enabled", type: "boolean", initialValue: false }),
        defineField({ name: "text", title: "Text", type: "string" })
      ]
    }),
    defineField({
      name: "recruiterProfile",
      title: "Recruiter Profile",
      type: "object",
      fields: [
        defineField({ name: "targetRoles", title: "Target Roles", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "workAuthorization", title: "Work Authorization", type: "string" }),
        defineField({ name: "availability", title: "Availability", type: "string" }),
        defineField({
          name: "preferredWorkType",
          title: "Preferred Work Type",
          type: "string",
          options: {
            list: ["Remote", "Hybrid", "Onsite", "Remote/Hybrid"].map((value) => ({ title: value, value }))
          }
        }),
        defineField({ name: "industriesOfInterest", title: "Industries of Interest", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "yearsExperience", title: "Years Experience", type: "number" }),
        defineField({ name: "primaryStrengths", title: "Primary Strengths", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "recruiterSummary", title: "Recruiter Summary", type: "text", rows: 4 }),
        defineField({
          name: "showAdditionalContext",
          title: "Show Additional Context",
          type: "boolean",
          initialValue: true,
          description: "Toggle visibility of additional recruiter-only context"
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    }
  }
});

export default siteSettings;
