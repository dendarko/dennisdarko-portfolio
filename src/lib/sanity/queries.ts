import groq from "groq";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  name,
  headline,
  description,
  url,
  email,
  location,
  links{
    github,
    linkedin
  },
  keywords,
  "resumeFileUrl": resumeFile.asset->url,
  "featuredProjectSlugs": featuredProjects[]->slug.current,
  announcement,
  recruiterProfile
}`;

export const projectListQuery = groq`*[_type == "project"] | order(date desc){
  _id,
  title,
  "slug": slug.current,
  stage,
  featured,
  date,
  impact,
  highlights,
  stack[]{
    name,
    category
  },
  tags,
  proof,
  metrics,
  repo,
  externalUrl,
  demoUrl,
  nextImprovements,
  recruiterNotes,
  caseStudy,
  "architectureImage": architectureImage.asset->url,
  "architectureImageCaption": architectureImage.caption,
  categories,
  relevanceScore
}`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  stage,
  featured,
  date,
  impact,
  highlights,
  stack[]{
    name,
    category
  },
  tags,
  proof,
  metrics,
  repo,
  externalUrl,
  demoUrl,
  nextImprovements,
  recruiterNotes,
  caseStudy,
  "architectureImage": architectureImage.asset->url,
  "architectureImageCaption": architectureImage.caption,
  categories,
  relevanceScore,
  body,
  "gallery": gallery[]{
    "url": asset->url,
    caption,
    projectSlug
  }
}`;

export const playbookListQuery = groq`*[_type == "playbook"] | order(coalesce(updatedAt, date) desc){
  title,
  "slug": slug.current,
  "description": coalesce(excerpt, ""),
  "date": coalesce(date, string::split(updatedAt, "T")[0]),
  updatedAt,
  audience,
  checklistLength
}`;

export const playbookSlugsQuery = groq`*[_type == "playbook" && defined(slug.current)]{ "slug": slug.current }`;

export const playbookBySlugQuery = groq`*[_type == "playbook" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  "description": coalesce(excerpt, ""),
  "date": coalesce(date, string::split(updatedAt, "T")[0]),
  updatedAt,
  audience,
  checklistLength,
  body
}`;

export const architectureGalleryQuery = groq`*[_type == "project" && (defined(architectureImage) || count(gallery) > 0)]{
  title,
  "slug": slug.current,
  "architecture": select(defined(architectureImage) => {
    "url": architectureImage.asset->url,
    "caption": coalesce(architectureImage.caption, title + " architecture diagram")
  }),
  "gallery": gallery[]{
    "url": asset->url,
    "caption": coalesce(caption, title + " image"),
    projectSlug
  }
}`;
