"use client";

export function AnalyticsProvider() {
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "true") {
    return null;
  }

  return null;
}
