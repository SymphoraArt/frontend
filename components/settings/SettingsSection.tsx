import React from "react";
import "./settings.css";

interface SettingsSectionProps {
  num: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export default function SettingsSection({ num, title, description, children }: SettingsSectionProps) {
  return (
    <div className="set-section">
      <div className="set-section-header">
        <div className="set-section-title-wrap">
          <span className="set-section-num">{num}</span>
          <span className="set-section-title">{title}</span>
        </div>
      </div>
      {description && <div className="set-section-desc">{description}</div>}
      <div>
        {children}
      </div>
    </div>
  );
}
