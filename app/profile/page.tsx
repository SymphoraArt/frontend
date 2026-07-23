import ProfileView from "@/components/profile/ProfileView";

/**
 * /profile route wrapper. The profile UI lives in a component because it is
 * also embedded in the app shell (EnkiHome) with an `onBack` prop — and a
 * Next page default export must satisfy PageProps, so it can't carry those
 * props directly. The route renders the component with its defaults.
 */
export default function ProfilePage() {
  return <ProfileView />;
}
