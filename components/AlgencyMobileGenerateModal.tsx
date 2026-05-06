import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import "../app/editor/mobile-modal.css"; // We will create this next

interface PromptVariable {
  id: string;
  name: string;
  label: string;
  type: string;
  defaultValue: string | boolean;
  values: string[];
}

interface AlgencyMobileGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptBody: string;
  setPromptBody?: (val: string) => void;
  variables: PromptVariable[];
  onVariableChange?: (id: string, val: string) => void;
  onAddVariable?: () => void;
  onRemoveVariable?: (name: string) => void;
  models: { available: any[], selected: string[] };
  setModel?: (id: string) => void;
  ratios: { available: string[], selected: string };
  setRatio?: (val: string) => void;
  pricePerSlot: number;
  onGenerate: () => void;
  onAutoFill?: () => void;
  isAutoFilling?: boolean;
}

export default function AlgencyMobileGenerateModal({
  isOpen,
  onClose,
  promptBody,
  setPromptBody,
  variables,
  onVariableChange,
  onAddVariable,
  onRemoveVariable,
  models,
  setModel,
  ratios,
  setRatio,
  pricePerSlot,
  onGenerate,
  onAutoFill,
  isAutoFilling = false
}: AlgencyMobileGenerateModalProps) {
  const [activeTab, setActiveTab] = useState<"Generate" | "Release">("Generate");

  if (!isOpen) return null;

  // Helper to render prompt with pills
  const renderPromptWithPills = () => {
    // A simple regex to replace [bracketed] variables with pills
    const parts = promptBody.split(/(\[[a-z_0-9]+\]|\{[a-z_0-9]+\}|<[a-z_0-9]+>)/gi);
    return (
      <div className="mobile-modal-prompt-text">
        {parts.map((part, index) => {
          if (part.match(/^(\[|\{|<)[a-z_0-9]+(\]|\}|>)$/i)) {
            return (
              <span key={index} className="mobile-modal-pill">
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="mobile-modal-overlay">
      <div className="mobile-modal-sheet">
        {/* Drag handle */}
        <div className="mobile-modal-handle"></div>

        {/* Header */}
        <div className="mobile-modal-header">
          <div className="mobile-modal-tabs">
            <button
              className={`mobile-modal-tab ${activeTab === "Generate" ? "active" : ""}`}
              onClick={() => setActiveTab("Generate")}
            >
              Generate
            </button>
            <button
              className={`mobile-modal-tab ${activeTab === "Release" ? "active" : ""}`}
              onClick={() => setActiveTab("Release")}
            >
              Release
            </button>
          </div>
          <button className="mobile-modal-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="mobile-modal-content">
          {activeTab === "Generate" ? (
            <>
              {/* Generate Tab Content */}
              {/* Prompt Section */}
              <div className="mobile-modal-section">
                <label className="mobile-modal-label">PROMPT</label>
                {setPromptBody ? (
                  <textarea
                    className="mobile-modal-prompt-box"
                    style={{ width: "100%", minHeight: 100, border: "1px solid #EBE5DB", borderRadius: 8, padding: 14, fontFamily: "var(--font-serif), serif", fontSize: 16, color: "#5A5550", background: "#F6F3EC", resize: "vertical", outline: "none" }}
                    value={promptBody}
                    onChange={(e) => setPromptBody(e.target.value)}
                  />
                ) : (
                  <div className="mobile-modal-prompt-box">
                    {renderPromptWithPills()}
                  </div>
                )}
              </div>

              {/* Variables List */}
              <div className="mobile-modal-section mobile-modal-variables">
                {variables.map((variable) => (
                  <div key={variable.id} className="mobile-modal-var-row">
                    <span className="mobile-modal-var-name">{variable.name}</span>
                    <input
                      type="text"
                      className="mobile-modal-var-input"
                      value={variable.values[0] || (variable.defaultValue as string)}
                      onChange={(e) => onVariableChange && onVariableChange(variable.id, e.target.value)}
                      placeholder={`Enter ${variable.name}...`}
                    />
                  </div>
                ))}
              </div>

              <div className="mobile-modal-divider" />

              {/* Settings Grid */}
              <div className="mobile-modal-settings-grid">
                <div className="mobile-modal-setting">
                  <label className="mobile-modal-label">MODEL</label>
                  <select 
                    className="mobile-modal-select" 
                    value={models.selected[0] || ""}
                    onChange={(e) => setModel && setModel(e.target.value)}
                  >
                    {models.available.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mobile-modal-setting">
                  <label className="mobile-modal-label">ASPECT</label>
                  <select 
                    className="mobile-modal-select" 
                    value={ratios.selected}
                    onChange={(e) => setRatio && setRatio(e.target.value)}
                  >
                    {ratios.available.length > 0 ? ratios.available.map(r => (
                      <option key={r} value={r}>{r}</option>
                    )) : (
                      <option value="Any ratio">Any ratio</option>
                    )}
                  </select>
                </div>
                <div className="mobile-modal-setting">
                  <label className="mobile-modal-label">RESOLUTION</label>
                  <select className="mobile-modal-select" defaultValue="2K">
                    <option>2K</option>
                    <option>4K</option>
                  </select>
                </div>
                <div className="mobile-modal-setting">
                  <label className="mobile-modal-label">GENERATIONS</label>
                  <select className="mobile-modal-select" defaultValue="x 1">
                    <option>x 1</option>
                    <option>x 4</option>
                  </select>
                </div>
              </div>

              {/* Pay With Row */}
              <div className="mobile-modal-pay-row">
                <span className="mobile-modal-pay-label">Pay with</span>
                <div className="mobile-modal-pay-value">
                  <div className="mobile-modal-sol-icon">≡</div>
                  <span className="mobile-modal-pay-network">Solana</span>
                  <span className="mobile-modal-pay-address">· 4a...ef21</span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Release Tab Content */}
              {/* Prompt Template Section */}
              <div className="mobile-modal-section">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <label className="mobile-modal-label" style={{ margin: 0 }}>PROMPT TEMPLATE</label>
                  <button className="mobile-modal-add-var-btn" onClick={onAddVariable}>
                    + Variable
                  </button>
                </div>
                {setPromptBody ? (
                  <textarea
                    className="mobile-modal-prompt-box"
                    style={{ width: "100%", minHeight: 100, border: "1px solid #EBE5DB", borderRadius: 8, padding: 14, fontFamily: "var(--font-serif), serif", fontSize: 16, color: "#5A5550", background: "#F6F3EC", resize: "vertical", outline: "none" }}
                    value={promptBody}
                    onChange={(e) => setPromptBody(e.target.value)}
                  />
                ) : (
                  <div className="mobile-modal-prompt-box">
                    {/* Render prompt with dashed boxes for variables to match design */}
                    <div className="mobile-modal-dashed-prompt">
                      {variables.map((v, i) => (
                        <span key={i} className="mobile-modal-dashed-pill">[]</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Variables Manager */}
              <div className="mobile-modal-section">
                <label className="mobile-modal-label">VARIABLES · {variables.length}</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {variables.map((variable) => (
                    <div key={variable.id} className="mobile-modal-var-manager-card">
                      <div className="mobile-modal-var-manager-header">
                        <span className="mobile-modal-dashed-name">[{variable.name}]</span>
                        <button 
                          className="mobile-modal-close" 
                          style={{ width: 24, height: 24, border: "none", background: "#F2EFEA" }}
                          onClick={() => onRemoveVariable && onRemoveVariable(variable.name)}
                        >
                          <X size={14} color="#8A7F72" />
                        </button>
                      </div>
                      <div className="mobile-modal-var-types">
                        <button className="mobile-modal-var-type active">Text</button>
                        <button className="mobile-modal-var-type">Image</button>
                        <button className="mobile-modal-var-type">NFT</button>
                        <button className="mobile-modal-var-type">Select</button>
                      </div>
                      <input
                        type="text"
                        className="mobile-modal-var-manager-input"
                        placeholder="Comma-separated options: option a, option b..."
                        value={variable.defaultValue as string}
                        onChange={(e) => onVariableChange && onVariableChange(variable.id, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mobile-modal-divider" />

              {/* Settings Grid */}
              <div className="mobile-modal-settings-grid">
                <div className="mobile-modal-setting">
                  <label className="mobile-modal-label">MODEL</label>
                  <select className="mobile-modal-select" value={models.selected[0] || ""} onChange={(e) => setModel && setModel(e.target.value)}>
                    {models.available.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div className="mobile-modal-setting">
                  <label className="mobile-modal-label">ASPECT</label>
                  <select className="mobile-modal-select" value={ratios.selected} onChange={(e) => setRatio && setRatio(e.target.value)}>
                    {ratios.available.length > 0 ? ratios.available.map(r => <option key={r} value={r}>{r}</option>) : <option value="Any ratio">Any ratio</option>}
                  </select>
                </div>
                <div className="mobile-modal-setting">
                  <label className="mobile-modal-label">RESOLUTION</label>
                  <select className="mobile-modal-select" defaultValue="2K">
                    <option>2K</option><option>4K</option>
                  </select>
                </div>
                <div className="mobile-modal-setting">
                  <label className="mobile-modal-label">PRICE PER RUN</label>
                  <select className="mobile-modal-select" value={pricePerSlot.toFixed(2)} disabled>
                    <option value={pricePerSlot.toFixed(2)}>${pricePerSlot.toFixed(2)}</option>
                  </select>
                </div>
              </div>

              {/* Earn On Row */}
              <div className="mobile-modal-pay-row">
                <span className="mobile-modal-pay-label">Earn on</span>
                <div className="mobile-modal-pay-value">
                  <div className="mobile-modal-sol-icon">≡</div>
                  <span className="mobile-modal-pay-network">Solana</span>
                  <span className="mobile-modal-pay-address">· 4a...ef21</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mobile-modal-footer">
          {activeTab === "Generate" ? (
            <div className="mobile-modal-footer-actions">
              {/* Auto Fill */}
              <button
                className="mobile-modal-autofill-btn"
                onClick={() => onAutoFill && onAutoFill()}
                disabled={isAutoFilling}
              >
                <Sparkles size={12} />
                {isAutoFilling ? "Filling..." : "Auto Fill"}
              </button>

              {/* Price + Generate */}
              <div className="mobile-modal-footer-right">
                <div className="mobile-modal-price-badge">
                  <span className="mobile-modal-price-label">COST</span>
                  <span className="mobile-modal-price-value">${pricePerSlot.toFixed(2)}</span>
                  <span className="mobile-modal-price-network">via x402</span>
                </div>
                <button className="mobile-modal-generate-btn" onClick={onGenerate}>
                  <Sparkles size={13} style={{ fill: "white" }} />
                  Pay &amp; Generate
                </button>
              </div>
            </div>
          ) : (
            <button className="mobile-modal-generate-btn" onClick={onGenerate}>
              <Sparkles size={14} style={{ fill: "white" }} />
              Release prompt · {variables.length} var{variables.length !== 1 ? 's' : ''}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
