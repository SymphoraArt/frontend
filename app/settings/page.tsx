import SettingsView from "@/components/settings/SettingsView";

/**
 * /settings route wrapper. The settings UI lives in a component because the
 * app shell (EnkiHome) embeds it with props (initialTab, banners…), and a
 * Next page default export must satisfy PageProps — so it can't carry those
 * props directly. The route renders it with its defaults.
 */
export default function SettingsPage() {
  return <SettingsView />;
}
