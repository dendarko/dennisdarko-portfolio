"use client";

export function AnalyticsPlaceholder() {
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "true") {
    return null;
  }

  // Replace with your analytics vendor snippet/component when ready.
  return null;
}
