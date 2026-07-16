import { redirect } from "next/navigation";

// The landing page lives ONLY at "/" — this legacy route forwards there so no
// second copy (with stale chrome) can drift apart from the real one.
export default function LandingRedirect() {
  redirect("/");
}
