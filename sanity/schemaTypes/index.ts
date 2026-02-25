import { playbook } from "./documents/playbook";
import { project } from "./documents/project";
import { siteSettings } from "./documents/siteSettings";
import { teachingPost } from "./documents/teachingPost";
import { testimonial } from "./documents/testimonial";
import { portableText } from "./objects/portableText";

export const schemaTypes = [
  portableText,
  siteSettings,
  project,
  teachingPost,
  playbook,
  testimonial
];
