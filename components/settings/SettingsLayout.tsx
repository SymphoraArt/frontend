import React from "react";
import "./settings.css";

interface SettingsLayoutProps {
  children: React.ReactNode;
  breadcrumbs: string;
  title: React.ReactNode;
  description?: string;
}

export default function SettingsLayout({ children, breadcrumbs, title, description }: SettingsLayoutProps) {
  return (
    <div className="set-page">
      <div className="set-container">
        <div className="set-breadcrumbs">{breadcrumbs}</div>
        <h1 className="set-title">{title}</h1>
        {/* Always rendered so the reserved min-height keeps the tab menu fixed. */}
        <p className="set-description">{description}</p>
        {children}
      </div>
    </div>
  );
}
