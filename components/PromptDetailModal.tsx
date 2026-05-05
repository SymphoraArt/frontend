"use client";

import React, { useState, useEffect } from "react";
import { X, Heart, Image as ImageIcon, ChevronDown, Save, Share, Flag } from "lucide-react";
import "./PromptDetailModal.css";
import ReportModal from "./ReportModal";

interface Variable {
  name: string;
  value: string;
}

interface PromptData {
  id: string;
  title: string;
  artist: string;
  artistHandle?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  showcaseImages?: any[];
  variables?: Variable[];
  price?: number;
  tags?: string[];
  createdAt?: string;
  uses?: number;
}

interface PromptDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: PromptData | null;
}

export default function PromptDetailModal({ isOpen, onClose, prompt }: PromptDetailModalProps) {
  const [aspect, setAspect] = useState("4:5");
  const [resolution, setResolution] = useState("2K");
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prompt?.variables) {
      const initial: Record<string, string> = {};
      prompt.variables.forEach(v => {
        initial[v.name] = v.value;
      });
      setVariableValues(initial);
    } else {
      // Dummy data if none provided
      setVariableValues({
        SUBJECT: "a young woman with dark hair",
        MOOD: "contemplative, soft"
      });
    }
  }, [prompt]);

  if (!isOpen || !prompt) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleVarChange = (name: string, val: string) => {
    setVariableValues(prev => ({ ...prev, [name]: val }));
  };

  const artistHandle = prompt.artistHandle || `@${prompt.artist.toLowerCase().replace(/\s+/g, '.')}`;
  const tags = prompt.tags && prompt.tags.length > 0 ? prompt.tags : ["PRODUCT", "FASHION"];
  const dateStr = prompt.createdAt ? new Date(prompt.createdAt).toLocaleDateString() : "1 DAY AGO";
  const uses = prompt.uses || 161;

  // Mock variables if none
  const displayVars = prompt.variables && prompt.variables.length > 0 ? prompt.variables.map(v => v.name) : ["SUBJECT", "MOOD"];

  return (
    <div className="pdm-backdrop" onClick={handleBackdropClick}>
      <div className="pdm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="pdm-close-btn" onClick={onClose}>
          <X size={18} color="#111" />
        </button>

        <div className="pdm-hero">
          <div className="pdm-cover-wrapper">
            <img src={prompt.imageUrl} alt={prompt.title} className="pdm-cover-image" />
            <div className="pdm-cover-overlay">COVER - CLICK TO EXPAND</div>
          </div>
          <div className="pdm-thumbnails">
            <div className="pdm-thumbnail">
              <img src={prompt.imageUrl} alt="Cover" />
              <div className="pdm-thumbnail-label">Cover</div>
            </div>
            {/* Dummy thumbnails for UI exact match */}
            {[1, 2, 3, 4].map((v) => (
              <div key={v} className="pdm-thumbnail" style={{ background: v % 2 === 0 ? '#546356' : '#55373a' }}>
                <div className="pdm-thumbnail-label">v0{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pdm-content">
          <div>
            <div className="pdm-header-meta">
              IMAGE PROMPT &middot; {dateStr} &middot; {uses} USES 
              <span className="pdm-badge-premium">PREMIUM</span>
            </div>
            
            <h1 className="pdm-title">
              {prompt.title.split(' ').map((word, i, arr) => (
                <React.Fragment key={i}>
                  {i === arr.length - 1 ? <span>{word}</span> : word + ' '}
                </React.Fragment>
              ))}
            </h1>
            
            <div className="pdm-author-row">
              <div className="pdm-author-info">
                <div className="pdm-avatar">
                  {prompt.artist.substring(0, 2).toUpperCase()}
                </div>
                <div className="pdm-author-text">
                  <span className="pdm-author-name">By {prompt.artist}</span>
                  <span className="pdm-author-handle">{artistHandle} &middot; Midjourney v7</span>
                </div>
              </div>
              <button className="pdm-heart-btn">
                <Heart size={16} fill="currentColor" />
              </button>
            </div>

            <div className="pdm-tags">
              {tags.map(tag => (
                <span key={tag} className="pdm-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="pdm-divider" />

          <div className="pdm-section">
            <div className="pdm-section-header">
              <span>VARIABLES &middot; PROMPT BODY LOCKED</span>
              <span className="highlight">{displayVars.length} variables exposed</span>
            </div>
            
            {displayVars.map((varName) => (
              <div className="pdm-variable-row" key={varName}>
                <div className="pdm-variable-label">{varName}</div>
                <div className="pdm-variable-input-wrapper">
                  <textarea 
                    className="pdm-variable-input" 
                    rows={1}
                    value={variableValues[varName] || ""}
                    onChange={(e) => handleVarChange(varName, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pdm-divider" />

          <div className="pdm-section">
            <div className="pdm-setting-row">
              <div className="pdm-setting-label">GENERATOR</div>
              <div className="pdm-setting-control">
                <div className="pdm-select-fake">
                  Nano Banana Pro
                </div>
                <div className="pdm-select-fake pdm-select-price">
                  $0.05 <ChevronDown size={14} />
                </div>
              </div>
            </div>

            <div className="pdm-setting-row">
              <div className="pdm-setting-label">ASPECT</div>
              <div className="pdm-setting-control">
                <div className="pdm-btn-group">
                  {["3:4", "4:5", "1:1", "2:3", "4:3", "16:9"].map(a => (
                    <button 
                      key={a} 
                      className={aspect === a ? "active" : ""}
                      onClick={() => setAspect(a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pdm-setting-row">
              <div className="pdm-setting-label">RESOLUTION</div>
              <div className="pdm-setting-control">
                <div className="pdm-btn-group">
                  {["1K", "2K", "4K"].map(r => (
                    <button 
                      key={r} 
                      className={resolution === r ? "active" : ""}
                      onClick={() => setResolution(r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pdm-divider" />

          <div className="pdm-section" style={{ gap: '12px' }}>
            <div className="pdm-section-header">
              <span>REFERENCE INPUTS</span>
              <span>0 of 18 &middot; optional</span>
            </div>
            <p className="pdm-reference-text">
              Attach an image you've uploaded, or a NFT from your wallet — the prompt will use it as visual reference. You can mix both, drag to reorder.
            </p>
            <div className="pdm-reference-actions">
              <button className="pdm-action-btn-outline">
                <ImageIcon size={16} /> Upload Image
              </button>
              <button className="pdm-action-btn-outline">
                &loz; Pick NFT <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="pdm-bottom-actions">
            <button className="pdm-generate-btn">
              Generate &middot; $0.05 <span className="sub">Nano Banana Pro &middot; Base</span>
            </button>
            <button className="pdm-secondary-btn">
              <Save size={16} /> Save
            </button>
            <button className="pdm-secondary-btn">
              <Share size={16} /> Share <ChevronDown size={14} />
            </button>
            <ReportModal title={`Report Prompt: ${prompt.title}`}>
              <button className="pdm-secondary-btn text-muted-foreground hover:text-destructive">
                <Flag size={16} /> Report
              </button>
            </ReportModal>
          </div>

          <div className="pdm-section" style={{ marginTop: '20px' }}>
            <div className="pdm-generations-header">
              <span>YOUR GENERATIONS FROM THIS PROMPT</span>
              <span>6 runs &middot; last 30 days</span>
            </div>
            <div className="pdm-generations-grid">
              <div className="pdm-generation-item" style={{ background: '#454a5c' }}></div>
              <div className="pdm-generation-item" style={{ background: '#5d6955' }}></div>
              <div className="pdm-generation-item" style={{ background: '#563535' }}></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
