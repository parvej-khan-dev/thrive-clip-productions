import { defineCliConfig } from "sanity/cli";

// projectId/dataset are public (already in .env.local.example). Used by the
// Sanity CLI for `sanity dataset import`, `sanity documents`, etc.
export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "83i6avo8",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  },
});
