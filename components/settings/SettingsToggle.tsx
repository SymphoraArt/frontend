import React from "react";
import "./settings.css";

interface SettingsToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export default function SettingsToggle({ checked, disabled, onChange }: SettingsToggleProps) {
  return (
    <div 
      className={`set-toggle ${checked ? 'on' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={() => { if (!disabled) onChange(!checked); }}
    >
      <div className="set-toggle-thumb" />
    </div>
  );
}
