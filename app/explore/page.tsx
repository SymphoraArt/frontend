import { redirect } from "next/navigation";

// Explore now lives at /home (inside the left-side-menu shell).
export default function ExplorePage() {
  redirect("/home");
}
