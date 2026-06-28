import { redirect } from "next/navigation";

// /images was folded into /home. Images (and later videos) will return as
// sub-views of the home feed.
export default function ImagesPage() {
  redirect("/home");
}
