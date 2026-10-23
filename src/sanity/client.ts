import { createClient } from "@sanity/client";

const projectId = (import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined) ?? "xv2mhkr9";
const dataset   = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? "production";
const token     = import.meta.env.VITE_SANITY_TOKEN as string | undefined;

export const isConfigured = Boolean(projectId);

// Only create the client when a projectId is actually present —
// createClient throws synchronously if projectId is missing or empty.
export const sanityClient = isConfigured
  ? createClient({ projectId: projectId!, dataset, useCdn: false, apiVersion: "2024-01-01", token, perspective: "published" })
  : null;
