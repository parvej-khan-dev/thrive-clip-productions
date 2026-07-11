import StudioLoader from "./studio-loader";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <StudioLoader />;
}
