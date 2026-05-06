"use client";

import React, { useState } from "react";
import { AlertTriangle, Lock } from "lucide-react";
import "./settings.css";

export interface TurnkeyRecoveryDevice {
  id: string;
  name: string;
  method: string;
  lastUsed: string;
  isCurrentDevice: boolean;
}

interface TurnkeyRemoveDeviceModalProps {
  isOpen: boolean;
  device: TurnkeyRecoveryDevice | null;
  currentDeviceName: string;
  onClose: () => void;
  onConfirmRemove: (device: TurnkeyRecoveryDevice) => void;
  onFallbackRecovery: (device: TurnkeyRecoveryDevice) => void;
}

export default function TurnkeyRemoveDeviceModal({
  isOpen,
  device,
  currentDeviceName,
  onClose,
  onConfirmRemove,
  onFallbackRecovery,
}: TurnkeyRemoveDeviceModalProps) {
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");

  if (!isOpen || !device) return null;

  const handleClose = () => {
    setFallbackOpen(false);
    setMasterPassword("");
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleFallbackSubmit = () => {
    onFallbackRecovery(device);
    handleClose();
  };

  return (
    <div className="turnkey-modal-backdrop" onClick={handleBackdropClick}>
      <div className="turnkey-modal turnkey-modal-wide" onClick={(e) => e.stopPropagation()}>
        {!fallbackOpen ? (
          <>
            <div className="turnkey-modal-body turnkey-remove-body">
              <p className="turnkey-kicker turnkey-danger-text">REMOVE DEVICE</p>
              <h2 className="turnkey-title turnkey-remove-title">Remove {device.name}?</h2>
              <p className="turnkey-remove-copy">
                You&apos;ll have one fewer way to sign in. This is one of your only two devices — make sure you can still get in with{" "}
                <strong>{currentDeviceName}</strong>. <strong>This can&apos;t be undone.</strong>
              </p>

              <div className="turnkey-confirm-row">
                <div className="turnkey-confirm-pill">
                  <Lock size={16} />
                  <span>You&apos;ll be asked to confirm on this device.</span>
                </div>
                <button
                  className="turnkey-warning-link"
                  onClick={() => setFallbackOpen(true)}
                  type="button"
                >
                  <AlertTriangle size={15} />
                  I can&apos;t access device
                </button>
              </div>
            </div>

            <div className="turnkey-modal-footer">
              <button className="turnkey-footer-btn turnkey-footer-btn-light" onClick={handleClose} type="button">
                Keep it
              </button>
              <button
                className="turnkey-footer-btn turnkey-footer-btn-danger"
                onClick={() => {
                  onConfirmRemove(device);
                  handleClose();
                }}
                type="button"
              >
                Remove device
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="turnkey-modal-body turnkey-remove-body">
              <p className="turnkey-kicker turnkey-danger-text">RECOVERY CHECK</p>
              <h2 className="turnkey-title turnkey-remove-title">Verify master password.</h2>
              <p className="turnkey-remove-copy">
                Use this only if you can&apos;t confirm from {device.name}. Verifying your master password starts the fallback recovery path for this device.
              </p>

              <div className="turnkey-panel">
                <label className="turnkey-code-label" htmlFor="turnkey-master-password">
                  MASTER PASSWORD
                </label>
                <input
                  id="turnkey-master-password"
                  className="turnkey-code-input"
                  type="password"
                  value={masterPassword}
                  onChange={(e) => setMasterPassword(e.target.value)}
                  placeholder="Enter master password"
                  autoComplete="current-password"
                />
                <p className="turnkey-muted">Frontend-only placeholder until backend recovery policy is finalized.</p>
              </div>
            </div>

            <div className="turnkey-modal-footer">
              <button className="turnkey-footer-btn turnkey-footer-btn-light" onClick={() => setFallbackOpen(false)} type="button">
                Back
              </button>
              <button
                className="turnkey-footer-btn turnkey-footer-btn-dark"
                onClick={handleFallbackSubmit}
                disabled={!masterPassword.trim()}
                type="button"
              >
                Verify and continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
