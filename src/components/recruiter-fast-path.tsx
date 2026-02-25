import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function RecruiterFastPath() {
  return (
    <aside className="card p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Recruiter Fast Path</h2>
        <span className="chip">2-minute scan</span>
      </div>
      <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
        Quick snapshot for roles, skills, and links to case studies, resume, and contact.
      </p>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">
          Target roles
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {siteConfig.roles.map((role) => (
            <span key={role} className="chip">
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">
          Skills snapshot
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {siteConfig.recruiterSkillSnapshot.map((skill) => (
            <span key={skill} className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-700 dark:bg-white/10 dark:text-ink-100">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {siteConfig.recruiterQuickLinks.map((item) => (
          <Link key={item.href} href={item.href} className="btn-secondary">
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
