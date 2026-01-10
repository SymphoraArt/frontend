// app/api-test/page.tsx
"use client";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

import React, { useMemo, useState } from "react";

type Json = any;

function safeJson(v: any) {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
}

function idToString(v: any) {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object" && v.$oid) return v.$oid;
  if (typeof v?.toString === "function") return v.toString();
  return "";
}

function isEncryptedPayload(obj: any): boolean {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.encrypted === "string" &&
    typeof obj.iv === "string" &&
    typeof obj.authTag === "string"
  );
}

function checkEncryptionStatus(data: any): {
  hasEncryptedSegments: boolean;
  encryptedSegmentsCount: number;
  hasFinalPrompt: boolean;
  finalPromptExpiresAt: string | null;
} {
  const segments = data?.promptData?.segments || [];
  const encryptedSegments = segments.filter(
    (seg: any) => seg?.type === "encrypted" && isEncryptedPayload(seg.content)
  );

  const finalPrompt = data?.finalPrompt;
  const hasFinalPrompt = !!finalPrompt && isEncryptedPayload(finalPrompt);

  return {
    hasEncryptedSegments: encryptedSegments.length > 0,
    encryptedSegmentsCount: encryptedSegments.length,
    hasFinalPrompt,
    finalPromptExpiresAt: finalPrompt?.expiresAt || null,
  };
}

function toCamelVar(raw: string) {
  // "LIGHT COLOR" -> "lightColor", "COLOR1" -> "color1"
  const cleaned = raw
    .trim()
    .replace(/[\[\]]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim();
  const parts = cleaned.split(" ").filter(Boolean);
  if (!parts.length) return "var";
  const [first, ...rest] = parts;
  return (
    first.toLowerCase() +
    rest
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join("")
  );
}

function titleCaseFromVar(varName: string) {
  // lightColor -> Light Color, color1 -> Color 1
  const withSpaces = varName
    .replace(/([A-Z])/g, " $1")
    .replace(/(\d+)/g, " $1")
    .trim();
  return withSpaces
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseTemplateToPromptData(template: string) {
  // Finds [TOKEN] (case-insensitive) and splits into segments + variables
  const re = /\[([^\]]+)\]/g;
  const segments: Array<any> = [];
  const varsInOrder: string[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let order = 1;

  while ((match = re.exec(template)) !== null) {
    const before = template.slice(lastIndex, match.index);
    if (before) {
      segments.push({ type: "encrypted", content: before, order: order++ });
    }

    const tokenRaw = match[1]; // inside [ ... ]
    const varName = toCamelVar(tokenRaw);

    segments.push({ type: "variable", variableName: varName, order: order++ });

    if (!varsInOrder.includes(varName)) varsInOrder.push(varName);

    lastIndex = match.index + match[0].length;
  }

  const after = template.slice(lastIndex);
  if (after) {
    segments.push({ type: "encrypted", content: after, order: order++ });
  }

  const variables = varsInOrder.map((name, i) => ({
    name,
    label: titleCaseFromVar(name),
    description: `Provide a value for ${titleCaseFromVar(name)}.`,
    type: "text",
    required: true,
    config: { maxLength: 140 },
    defaultValue: "sample",
    order: i + 1,
  }));

  return { segments, variables };
}

async function fetchJson(url: string, init?: RequestInit) {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const text = await res.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    const message =
      typeof data === "object" && data?.error ? data.error : res.statusText;
    throw new Error(`${res.status} ${message}`);
  }
  return data;
}

export default function ApiTestPage() {
  // ---------------------------
  // Users state
  // ---------------------------
  const [usersResult, setUsersResult] = useState<Json>(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState<string>("");

  const [userFilterUsername, setUserFilterUsername] = useState("");

  const [newUsername, setNewUsername] = useState("demo_user_99");
  const [newDisplayName, setNewDisplayName] = useState("Demo User 99");
  const [newBio, setNewBio] = useState("This is a demo profile.");

  const [getUserId, setGetUserId] = useState("");
  const [getUserResult, setGetUserResult] = useState<Json>(null);

  // ---------------------------
  // Prompts state
  // ---------------------------
  const [promptsResult, setPromptsResult] = useState<Json>(null);
  const [promptsLoading, setPromptsLoading] = useState(false);
  const [promptsError, setPromptsError] = useState<string>("");

  const [promptFilterCreatorId, setPromptFilterCreatorId] = useState("");
  const [promptFilterType, setPromptFilterType] = useState("");
  const [promptFilterCategory, setPromptFilterCategory] = useState("");
  const [promptFilterTag, setPromptFilterTag] = useState("");
  const [promptFilterQ, setPromptFilterQ] = useState("");
  const [promptFilterFeatured, setPromptFilterFeatured] = useState(""); // "", "true", "false"
  const [promptFilterLimit, setPromptFilterLimit] = useState(20);

  const [newPromptCreatorId, setNewPromptCreatorId] = useState("");
  const [newPromptType, setNewPromptType] = useState<
    "showcase" | "free" | "paid"
  >("free");
  const [newPromptTitle, setNewPromptTitle] = useState(
    "Template Prompt X - Test"
  );
  const [newPromptDescription, setNewPromptDescription] = useState(
    "Created from API test page."
  );
  const [newPromptCategory, setNewPromptCategory] = useState("test");
  const [newPromptTags, setNewPromptTags] = useState("demo,test");
  const [newPromptAspectRatio, setNewPromptAspectRatio] = useState("1:1");
  const [newPromptIncludeText, setNewPromptIncludeText] = useState(false);
  const [newPromptIsFeatured, setNewPromptIsFeatured] = useState(false);
  const [newPromptPublished, setNewPromptPublished] = useState(true);
  const [newPromptPrice, setNewPromptPrice] = useState(2.5);
  const [newPromptImages, setNewPromptImages] = useState<
    Array<{ url: string; thumbnail?: string; isPrimary?: boolean }>
  >([{ url: "", isPrimary: false }]);

  const [templateText, setTemplateText] = useState(
    `A blurred silhouette of a [subject] in motion, wearing a [color] sports kit, captured with a slow shutter for dynamic motion blur. High contrast, minimalist composition with no logos or text. Neutral background, abstract, and energetic. Editorial style reminiscent of [Brand] advertising.`
  );

  const parsedPromptData = useMemo(
    () => parseTemplateToPromptData(templateText),
    [templateText]
  );
  const [createPromptResult, setCreatePromptResult] = useState<Json>(null);

  const [getPromptId, setGetPromptId] = useState("");
  const [getPromptResult, setGetPromptResult] = useState<Json>(null);

  const [patchPromptId, setPatchPromptId] = useState("");
  const [patchTitle, setPatchTitle] = useState("");
  const [patchFeatured, setPatchFeatured] = useState<boolean | null>(null);
  const [patchResult, setPatchResult] = useState<Json>(null);

  // ---------------------------
  // Generations state
  // ---------------------------
  const [generationsResult, setGenerationsResult] = useState<Json>(null);
  const [generationsLoading, setGenerationsLoading] = useState(false);
  const [generationsError, setGenerationsError] = useState<string>("");

  const [generationFilterUserId, setGenerationFilterUserId] = useState("");
  const [generationFilterPromptId, setGenerationFilterPromptId] = useState("");
  const [generationFilterStatus, setGenerationFilterStatus] = useState("");
  const [generationFilterLimit, setGenerationFilterLimit] = useState(20);

  const [newGenerationUserId, setNewGenerationUserId] = useState("");
  const [newGenerationPromptId, setNewGenerationPromptId] = useState("");
  const [newGenerationAspectRatio, setNewGenerationAspectRatio] = useState("");
  const [newGenerationIncludeText, setNewGenerationIncludeText] =
    useState(false);
  const [newGenerationIsPrivate, setNewGenerationIsPrivate] = useState(false);
  const [newGenerationVariableValues, setNewGenerationVariableValues] =
    useState("");
  const [
    newGenerationFinalPromptTtlHours,
    setNewGenerationFinalPromptTtlHours,
  ] = useState("24");
  const [createGenerationResult, setCreateGenerationResult] =
    useState<Json>(null);

  const [getGenerationId, setGetGenerationId] = useState("");
  const [getGenerationResult, setGetGenerationResult] = useState<Json>(null);

  const [patchGenerationId, setPatchGenerationId] = useState("");
  const [patchGenerationStatus, setPatchGenerationStatus] = useState("");
  const [patchGenerationIsPrivate, setPatchGenerationIsPrivate] = useState<
    boolean | null
  >(null);
  const [patchGenerationLikes, setPatchGenerationLikes] = useState("");
  const [patchGenerationBookmarks, setPatchGenerationBookmarks] = useState("");
  const [patchGenerationResult, setPatchGenerationResult] =
    useState<Json>(null);

  // ---------------------------
  // State: End-to-End Flow
  // ---------------------------
  const [flowPromptId, setFlowPromptId] = useState("");
  const [flowPromptData, setFlowPromptData] = useState<Json>(null);
  const [flowVariables, setFlowVariables] = useState<Record<string, string>>(
    {}
  );
  const [flowGenerationId, setFlowGenerationId] = useState("");
  const [flowGenerationData, setFlowGenerationData] = useState<Json>(null);
  const [flowImageUrl, setFlowImageUrl] = useState("");
  const [flowLoading, setFlowLoading] = useState(false);
  const [flowError, setFlowError] = useState("");
  const [showDecryptedPrompt, setShowDecryptedPrompt] = useState(false);
  const [decryptedFinalPrompt, setDecryptedFinalPrompt] = useState<
    string | null
  >(null);

  // ---------------------------
  // Actions: Users
  // ---------------------------
  async function loadUsers() {
    setUsersError("");
    setUsersLoading(true);
    try {
      const url = userFilterUsername
        ? `/api/users?username=${encodeURIComponent(userFilterUsername)}`
        : `/api/users`;
      const data = await fetchJson(url);
      setUsersResult(data);

      // auto select creatorId if empty
      const list = Array.isArray(data?.users) ? data.users : [];
      if (!newPromptCreatorId && list.length) {
        setNewPromptCreatorId(idToString(list[0]._id));
      }
      // auto select userId for generation if empty
      if (!newGenerationUserId && list.length) {
        setNewGenerationUserId(idToString(list[0]._id));
      }
    } catch (e: any) {
      setUsersError(e.message || "Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  }

  async function createUser() {
    setUsersError("");
    setUsersLoading(true);
    try {
      const data = await fetchJson("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username: newUsername,
          displayName: newDisplayName,
          bio: newBio,
        }),
      });
      setUsersResult((prev: any) => ({ ...(prev || {}), lastCreate: data }));
      await loadUsers();
    } catch (e: any) {
      setUsersError(e.message || "Failed to create user");
    } finally {
      setUsersLoading(false);
    }
  }

  async function getUserById() {
    setUsersError("");
    setUsersLoading(true);
    try {
      const data = await fetchJson(
        `/api/users/${encodeURIComponent(getUserId)}`
      );
      setGetUserResult(data);
    } catch (e: any) {
      setUsersError(e.message || "Failed to get user");
    } finally {
      setUsersLoading(false);
    }
  }

  // ---------------------------
  // Actions: Prompts
  // ---------------------------
  async function loadPrompts() {
    setPromptsError("");
    setPromptsLoading(true);
    try {
      const sp = new URLSearchParams();
      if (promptFilterCreatorId) sp.set("creatorId", promptFilterCreatorId);
      if (promptFilterType) sp.set("type", promptFilterType);
      if (promptFilterCategory) sp.set("category", promptFilterCategory);
      if (promptFilterTag) sp.set("tag", promptFilterTag);
      if (promptFilterQ) sp.set("q", promptFilterQ);
      if (promptFilterFeatured) sp.set("featured", promptFilterFeatured);
      sp.set("limit", String(promptFilterLimit));

      const data = await fetchJson(`/api/prompts?${sp.toString()}`);
      setPromptsResult(data);

      // auto select promptId for generation if empty
      const list = Array.isArray(data?.items) ? data.items : [];
      if (!newGenerationPromptId && list.length) {
        setNewGenerationPromptId(idToString(list[0]._id));
      }
    } catch (e: any) {
      setPromptsError(e.message || "Failed to load prompts");
    } finally {
      setPromptsLoading(false);
    }
  }

  async function createPrompt() {
    setPromptsError("");
    setPromptsLoading(true);
    try {
      const tags = newPromptTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const body: any = {
        creatorId: newPromptCreatorId,
        type: newPromptType,
        title: newPromptTitle,
        description: newPromptDescription,
        category: newPromptCategory,
        tags,
        aiSettings: {
          aspectRatio: newPromptAspectRatio,
          includeText: newPromptIncludeText,
        },
        promptData: parsedPromptData,
        isFeatured: newPromptIsFeatured,
        published: newPromptPublished,
      };

      if (newPromptType === "paid") {
        body.pricing = { pricePerGeneration: Number(newPromptPrice) || 0 };
      }

      // Process showcase images
      const showcaseImages = newPromptImages
        .filter((img) => img.url.trim())
        .map((img) => ({
          url: img.url.trim(),
          thumbnail: img.thumbnail?.trim() || undefined,
          isPrimary: img.isPrimary || false,
        }));
      if (showcaseImages.length > 0) {
        body.showcaseImages = showcaseImages;
      }

      const data = await fetchJson("/api/prompts", {
        method: "POST",
        body: JSON.stringify(body),
      });

      // Check encryption status after creation
      if (data?.id) {
        try {
          const promptData = await fetchJson(`/api/prompts/${data.id}`);
          const encryptionStatus = checkEncryptionStatus(promptData?.prompt);
          setCreatePromptResult({
            ...data,
            encryptionStatus,
          });
        } catch {
          setCreatePromptResult(data);
        }
      } else {
        setCreatePromptResult(data);
      }

      await loadPrompts();
    } catch (e: any) {
      setPromptsError(e.message || "Failed to create prompt");
    } finally {
      setPromptsLoading(false);
    }
  }

  async function getPromptById() {
    setPromptsError("");
    setPromptsLoading(true);
    try {
      const data = await fetchJson(
        `/api/prompts/${encodeURIComponent(getPromptId)}`
      );
      const encryptionStatus = checkEncryptionStatus(data?.prompt);
      setGetPromptResult({
        ...data,
        encryptionStatus,
      });
    } catch (e: any) {
      setPromptsError(e.message || "Failed to get prompt");
    } finally {
      setPromptsLoading(false);
    }
  }

  async function patchPrompt() {
    setPromptsError("");
    setPromptsLoading(true);
    try {
      const body: any = {};
      if (patchTitle) body.title = patchTitle;
      if (patchFeatured !== null) body.isFeatured = patchFeatured;

      const data = await fetchJson(
        `/api/prompts/${encodeURIComponent(patchPromptId)}`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
        }
      );
      setPatchResult(data);
      await loadPrompts();
    } catch (e: any) {
      setPromptsError(e.message || "Failed to patch prompt");
    } finally {
      setPromptsLoading(false);
    }
  }

  // ---------------------------
  // Actions: Generations
  // ---------------------------
  async function loadGenerations() {
    setGenerationsError("");
    setGenerationsLoading(true);
    try {
      const sp = new URLSearchParams();
      if (generationFilterUserId) sp.set("userId", generationFilterUserId);
      if (generationFilterPromptId)
        sp.set("promptId", generationFilterPromptId);
      if (generationFilterStatus) sp.set("status", generationFilterStatus);
      sp.set("limit", String(generationFilterLimit));

      const data = await fetchJson(`/api/generations?${sp.toString()}`);
      setGenerationsResult(data);

      // auto select userId/promptId if empty
      const list = Array.isArray(data?.items) ? data.items : [];
      if (!newGenerationUserId && list.length && list[0].user) {
        setNewGenerationUserId(idToString(list[0].user));
      }
      if (!newGenerationPromptId && list.length && list[0].prompt) {
        setNewGenerationPromptId(idToString(list[0].prompt));
      }
    } catch (e: any) {
      setGenerationsError(e.message || "Failed to load generations");
    } finally {
      setGenerationsLoading(false);
    }
  }

  async function createGeneration() {
    setGenerationsError("");
    setGenerationsLoading(true);
    try {
      let variableValues: Array<{ variableName: string; value: any }> = [];
      if (newGenerationVariableValues) {
        try {
          variableValues = JSON.parse(newGenerationVariableValues);
        } catch {
          // if not valid JSON, try to parse as simple format
          const pairs = newGenerationVariableValues
            .split(",")
            .map((p) => p.trim());
          variableValues = pairs
            .filter((p) => p.includes(":"))
            .map((p) => {
              const [name, value] = p.split(":").map((s) => s.trim());
              return { variableName: name, value };
            });
        }
      }

      const body: any = {
        userId: newGenerationUserId,
        promptId: newGenerationPromptId,
        variableValues: variableValues.length > 0 ? variableValues : undefined,
        isPrivate: newGenerationIsPrivate,
      };

      // Add finalPromptTtlHours if provided
      if (newGenerationFinalPromptTtlHours) {
        const ttlHours = Number(newGenerationFinalPromptTtlHours);
        if (!isNaN(ttlHours) && ttlHours > 0) {
          body.finalPromptTtlHours = ttlHours;
        }
      }

      if (newGenerationAspectRatio || newGenerationIncludeText) {
        body.usedSettings = {};
        if (newGenerationAspectRatio)
          body.usedSettings.aspectRatio = newGenerationAspectRatio;
        if (newGenerationIncludeText)
          body.usedSettings.includeText = newGenerationIncludeText;
      }

      const data = await fetchJson("/api/generations", {
        method: "POST",
        body: JSON.stringify(body),
      });

      // Check encryption status after creation
      if (data?.id) {
        try {
          const generationData = await fetchJson(`/api/generations/${data.id}`);
          const encryptionStatus = checkEncryptionStatus(
            generationData?.generation
          );
          setCreateGenerationResult({
            ...data,
            encryptionStatus,
          });
        } catch {
          setCreateGenerationResult(data);
        }
      } else {
        setCreateGenerationResult(data);
      }

      await loadGenerations();
    } catch (e: any) {
      setGenerationsError(e.message || "Failed to create generation");
    } finally {
      setGenerationsLoading(false);
    }
  }

  async function getGenerationById() {
    setGenerationsError("");
    setGenerationsLoading(true);
    try {
      const data = await fetchJson(
        `/api/generations/${encodeURIComponent(getGenerationId)}`
      );
      const encryptionStatus = checkEncryptionStatus(data?.generation);
      setGetGenerationResult({
        ...data,
        encryptionStatus,
      });
    } catch (e: any) {
      setGenerationsError(e.message || "Failed to get generation");
    } finally {
      setGenerationsLoading(false);
    }
  }

  async function patchGeneration() {
    setGenerationsError("");
    setGenerationsLoading(true);
    try {
      const body: any = {};
      if (patchGenerationStatus) body.status = patchGenerationStatus;
      if (patchGenerationIsPrivate !== null)
        body.isPrivate = patchGenerationIsPrivate;
      if (patchGenerationLikes) body.likes = Number(patchGenerationLikes);
      if (patchGenerationBookmarks)
        body.bookmarks = Number(patchGenerationBookmarks);

      const data = await fetchJson(
        `/api/generations/${encodeURIComponent(patchGenerationId)}`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
        }
      );
      setPatchGenerationResult(data);
      await loadGenerations();
    } catch (e: any) {
      setGenerationsError(e.message || "Failed to patch generation");
    } finally {
      setGenerationsLoading(false);
    }
  }

  // ---------------------------
  // Actions: End-to-End Flow
  // ---------------------------
  async function loadFlowPrompt() {
    if (!flowPromptId.trim()) {
      setFlowError("Please enter a Prompt ID");
      return;
    }
    setFlowError("");
    setFlowLoading(true);
    try {
      const data = await fetchJson(
        `/api/prompts/${encodeURIComponent(flowPromptId.trim())}`
      );

      const prompt = data?.prompt || data;
      setFlowPromptData(prompt);

      // Extract variables from promptData
      const variables = prompt?.promptData?.variables || [];
      const newVars: Record<string, string> = {};
      variables.forEach((v: any) => {
        const key = v?.name || v?.key || "";
        if (key) {
          newVars[key] = "";
        }
      });
      setFlowVariables(newVars);

      // Auto-fill userId if available
      if (prompt?.creator && !newGenerationUserId) {
        setNewGenerationUserId(idToString(prompt.creator));
      }
    } catch (e: any) {
      setFlowError(e.message || "Failed to load prompt");
      setFlowPromptData(null);
    } finally {
      setFlowLoading(false);
    }
  }

  async function createFlowGeneration() {
    if (!flowPromptData) {
      setFlowError("Please load a prompt first");
      return;
    }
    if (!newGenerationUserId.trim()) {
      setFlowError("Please enter a User ID");
      return;
    }

    setFlowError("");
    setFlowLoading(true);
    try {
      const variables = flowPromptData?.promptData?.variables || [];
      const variableValues: Array<{ variableName: string; value: string }> = [];

      variables.forEach((v: any) => {
        const name = v?.name || v?.key || "";
        const value = flowVariables[name] || "";
        if (name && value) {
          variableValues.push({ variableName: name, value });
        }
      });

      const body: any = {
        userId: newGenerationUserId.trim(),
        promptId: flowPromptId.trim(),
        variableValues: variableValues,
      };

      if (newGenerationFinalPromptTtlHours) {
        body.finalPromptTtlHours = Number(newGenerationFinalPromptTtlHours);
      }

      const data = await fetchJson("/api/generations", {
        method: "POST",
        body: JSON.stringify(body),
      });

      setFlowGenerationId(data?.id || "");
      if (data?.id) {
        // Auto-load the created generation
        await loadFlowGeneration(data.id);
      }
    } catch (e: any) {
      setFlowError(e.message || "Failed to create generation");
    } finally {
      setFlowLoading(false);
    }
  }

  async function loadFlowGeneration(id?: string, decrypt: boolean = false) {
    const targetId = id || flowGenerationId;
    if (!targetId.trim()) {
      setFlowError("Please enter a Generation ID");
      return;
    }
    setFlowError("");
    setFlowLoading(true);
    try {
      const url = `/api/generations/${encodeURIComponent(targetId.trim())}${decrypt ? "?decrypt=true" : ""}`;
      const data = await fetchJson(url);
      const generation = data?.generation || data;
      setFlowGenerationData(generation);
      setFlowGenerationId(targetId.trim());

      // If decrypted, store the decrypted prompt
      if (
        generation?.finalPromptDecrypted &&
        typeof generation.finalPrompt === "string"
      ) {
        setDecryptedFinalPrompt(generation.finalPrompt);
        setShowDecryptedPrompt(true);
      } else {
        setDecryptedFinalPrompt(null);
        setShowDecryptedPrompt(false);
      }

      // Auto-fill image URL if available
      if (generation?.generatedImage) {
        setFlowImageUrl(generation.generatedImage);
      }
    } catch (e: any) {
      setFlowError(e.message || "Failed to load generation");
      setFlowGenerationData(null);
    } finally {
      setFlowLoading(false);
    }
  }

  async function completeFlowGeneration() {
    if (!flowGenerationId.trim()) {
      setFlowError("Please enter a Generation ID");
      return;
    }
    setFlowError("");
    setFlowLoading(true);
    try {
      const body: any = {
        status: "completed",
      };

      if (flowImageUrl.trim()) {
        body.generatedImage = flowImageUrl.trim();
      }

      body.completedAt = new Date().toISOString();

      const data = await fetchJson(
        `/api/generations/${encodeURIComponent(flowGenerationId.trim())}`,
        {
          method: "PATCH",
          body: JSON.stringify(body),
        }
      );

      // Reload generation to see updated data
      await loadFlowGeneration();
    } catch (e: any) {
      setFlowError(e.message || "Failed to complete generation");
    } finally {
      setFlowLoading(false);
    }
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div
      style={{
        padding: "16px clamp(16px, 4vw, 32px)",
        maxWidth: "100%",
        width: "100%",
        margin: "0 auto",
        fontFamily: "ui-sans-serif, system-ui",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
        API Test
      </h1>
      <p style={{ color: "#555", marginBottom: 20 }}>
        Test <code>/api/users</code>, <code>/api/prompts</code>, and{" "}
        <code>/api/generations</code> quickly from the browser.
      </p>

      {usersError && (
        <div
          style={{
            background: "#fee",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
            color: "#c00",
          }}
        >
          Users Error: {usersError}
        </div>
      )}

      {promptsError && (
        <div
          style={{
            background: "#fee",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
            color: "#c00",
          }}
        >
          Prompts Error: {promptsError}
        </div>
      )}

      {generationsError && (
        <div
          style={{
            background: "#fee",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
            color: "#c00",
          }}
        >
          Generations Error: {generationsError}
        </div>
      )}

      {flowError && (
        <div
          style={{
            background: "#fee",
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
            color: "#c00",
          }}
        >
          Flow Error: {flowError}
        </div>
      )}

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr" }}>
        {/* USERS */}
        <section
          style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Users
          </h2>

          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
                GET /api/users
              </h3>
              <label style={{ display: "block", fontSize: 12, color: "#666" }}>
                Filter by username (optional)
              </label>
              <input
                value={userFilterUsername}
                onChange={(e) => setUserFilterUsername(e.target.value)}
                placeholder="e.g. demo_user_01"
                style={{
                  width: "100%",
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  marginTop: 6,
                }}
              />
              <button
                onClick={loadUsers}
                disabled={usersLoading}
                style={{
                  marginTop: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #333",
                }}
              >
                {usersLoading ? "Loading..." : "Load Users"}
              </button>

              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                  Result
                </div>
                <pre
                  style={{
                    background: "#fafafa",
                    padding: 10,
                    borderRadius: 8,
                    overflow: "auto",
                    maxHeight: 260,
                  }}
                >
                  {usersResult ? safeJson(usersResult) : "No data"}
                </pre>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #eee",
                borderRadius: 12,
                padding: 12,
              }}
            >
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
                POST /api/users
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  style={{ display: "block", fontSize: 12, color: "#666" }}
                >
                  Username
                </label>
                <input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="username"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />

                <label
                  style={{ display: "block", fontSize: 12, color: "#666" }}
                >
                  Display Name
                </label>
                <input
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  placeholder="Display Name"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />

                <label
                  style={{ display: "block", fontSize: 12, color: "#666" }}
                >
                  Bio
                </label>
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Bio"
                  style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    minHeight: 60,
                  }}
                />

                <button
                  onClick={createUser}
                  disabled={usersLoading}
                  style={{
                    marginTop: 8,
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "1px solid #333",
                  }}
                >
                  {usersLoading ? "Creating..." : "Create User"}
                </button>

                {createPromptResult && (
                  <div style={{ marginTop: 10 }}>
                    <div
                      style={{ fontSize: 12, color: "#666", marginBottom: 6 }}
                    >
                      Last Create Result
                    </div>
                    {createPromptResult.encryptionStatus && (
                      <div
                        style={{
                          marginBottom: 8,
                          padding: 8,
                          background: createPromptResult.encryptionStatus
                            .hasEncryptedSegments
                            ? "#e8f5e9"
                            : "#fff3e0",
                          borderRadius: 6,
                          fontSize: 11,
                        }}
                      >
                        <strong>Encryption Status:</strong>
                        <div>
                          Encrypted Segments:{" "}
                          {createPromptResult.encryptionStatus
                            .encryptedSegmentsCount > 0
                            ? `✅ ${createPromptResult.encryptionStatus.encryptedSegmentsCount} segments encrypted`
                            : "❌ No encrypted segments found"}
                        </div>
                      </div>
                    )}
                    <pre
                      style={{
                        background: "#fafafa",
                        padding: 10,
                        borderRadius: 8,
                        overflow: "auto",
                        maxHeight: 120,
                      }}
                    >
                      {safeJson(createPromptResult)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 16,
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
              GET /api/users/:id
            </h3>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={getUserId}
                onChange={(e) => setGetUserId(e.target.value)}
                placeholder="User ID"
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={getUserById}
                disabled={usersLoading}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #333",
                }}
              >
                {usersLoading ? "Loading..." : "Get User"}
              </button>
            </div>
            {getUserResult && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                  Result
                </div>
                <pre
                  style={{
                    background: "#fafafa",
                    padding: 10,
                    borderRadius: 8,
                    overflow: "auto",
                    maxHeight: 260,
                  }}
                >
                  {safeJson(getUserResult)}
                </pre>
              </div>
            )}
          </div>
        </section>

        {/* PROMPTS */}
        <section
          style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Prompts
          </h2>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
              GET /api/prompts
            </h3>
            <div
              style={{
                display: "grid",
                gap: 8,
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Creator ID
                </label>
                <input
                  value={promptFilterCreatorId}
                  onChange={(e) => setPromptFilterCreatorId(e.target.value)}
                  placeholder="Creator ID"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Type
                </label>
                <select
                  value={promptFilterType}
                  onChange={(e) => setPromptFilterType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                >
                  <option value="">All</option>
                  <option value="showcase">Showcase</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Category
                </label>
                <input
                  value={promptFilterCategory}
                  onChange={(e) => setPromptFilterCategory(e.target.value)}
                  placeholder="Category"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Tag
                </label>
                <input
                  value={promptFilterTag}
                  onChange={(e) => setPromptFilterTag(e.target.value)}
                  placeholder="Tag"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Search (q)
                </label>
                <input
                  value={promptFilterQ}
                  onChange={(e) => setPromptFilterQ(e.target.value)}
                  placeholder="Search title"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Featured
                </label>
                <select
                  value={promptFilterFeatured}
                  onChange={(e) => setPromptFilterFeatured(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                >
                  <option value="">All</option>
                  <option value="true">Featured</option>
                  <option value="false">Not Featured</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Limit
                </label>
                <input
                  type="number"
                  value={promptFilterLimit}
                  onChange={(e) =>
                    setPromptFilterLimit(Number(e.target.value) || 20)
                  }
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
            </div>
            <button
              onClick={loadPrompts}
              disabled={promptsLoading}
              style={{
                marginTop: 12,
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #333",
              }}
            >
              {promptsLoading ? "Loading..." : "Load Prompts"}
            </button>
            {promptsResult && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                  Result
                </div>
                <pre
                  style={{
                    background: "#fafafa",
                    padding: 10,
                    borderRadius: 8,
                    overflow: "auto",
                    maxHeight: 300,
                  }}
                >
                  {safeJson(promptsResult)}
                </pre>
              </div>
            )}
          </div>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
              POST /api/prompts
            </h3>
            <div style={{ display: "grid", gap: 8 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 8,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Creator ID *
                  </label>
                  <input
                    value={newPromptCreatorId}
                    onChange={(e) => setNewPromptCreatorId(e.target.value)}
                    placeholder="Creator ID"
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Type *
                  </label>
                  <select
                    value={newPromptType}
                    onChange={(e) =>
                      setNewPromptType(
                        e.target.value as "showcase" | "free" | "paid"
                      )
                    }
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  >
                    <option value="showcase">Showcase</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Title *
                </label>
                <input
                  value={newPromptTitle}
                  onChange={(e) => setNewPromptTitle(e.target.value)}
                  placeholder="Title"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Description
                </label>
                <textarea
                  value={newPromptDescription}
                  onChange={(e) => setNewPromptDescription(e.target.value)}
                  placeholder="Description"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                    minHeight: 60,
                  }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 8,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Category
                  </label>
                  <input
                    value={newPromptCategory}
                    onChange={(e) => setNewPromptCategory(e.target.value)}
                    placeholder="Category"
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Tags (comma-separated)
                  </label>
                  <input
                    value={newPromptTags}
                    onChange={(e) => setNewPromptTags(e.target.value)}
                    placeholder="demo,test"
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 8,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Aspect Ratio
                  </label>
                  <input
                    value={newPromptAspectRatio}
                    onChange={(e) => setNewPromptAspectRatio(e.target.value)}
                    placeholder="1:1"
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 20,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={newPromptIncludeText}
                    onChange={(e) => setNewPromptIncludeText(e.target.checked)}
                  />
                  <label style={{ fontSize: 12, color: "#666" }}>
                    Include Text
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 20,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={newPromptIsFeatured}
                    onChange={(e) => setNewPromptIsFeatured(e.target.checked)}
                  />
                  <label style={{ fontSize: 12, color: "#666" }}>
                    Featured
                  </label>
                </div>
              </div>
              {newPromptType === "paid" && (
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Price per Generation
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newPromptPrice}
                    onChange={(e) =>
                      setNewPromptPrice(Number(e.target.value) || 0)
                    }
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
              )}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Template (use [VARIABLE] for variables)
                </label>
                <textarea
                  value={templateText}
                  onChange={(e) => setTemplateText(e.target.value)}
                  placeholder="Template with [variables]"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                    minHeight: 100,
                    fontFamily: "monospace",
                  }}
                />
                {parsedPromptData.variables.length > 0 && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: 8,
                      background: "#f0f0f0",
                      borderRadius: 6,
                      fontSize: 11,
                    }}
                  >
                    <strong>Detected Variables:</strong>{" "}
                    {parsedPromptData.variables
                      .map((v: any) => v.name)
                      .join(", ")}
                  </div>
                )}
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Showcase Images (URLs)
                </label>
                {newPromptImages.map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto auto auto",
                      gap: 8,
                      marginBottom: 8,
                      alignItems: "center",
                    }}
                  >
                    <input
                      value={img.url}
                      onChange={(e) => {
                        const updated = [...newPromptImages];
                        updated[idx] = { ...updated[idx], url: e.target.value };
                        setNewPromptImages(updated);
                      }}
                      placeholder="Image URL"
                      style={{
                        padding: 6,
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        fontSize: 12,
                      }}
                    />
                    <input
                      value={img.thumbnail || ""}
                      onChange={(e) => {
                        const updated = [...newPromptImages];
                        updated[idx] = {
                          ...updated[idx],
                          thumbnail: e.target.value,
                        };
                        setNewPromptImages(updated);
                      }}
                      placeholder="Thumbnail URL (optional)"
                      style={{
                        padding: 6,
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        fontSize: 12,
                        width: "150px",
                      }}
                    />
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        color: "#666",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={img.isPrimary || false}
                        onChange={(e) => {
                          const updated = [...newPromptImages];
                          updated[idx] = {
                            ...updated[idx],
                            isPrimary: e.target.checked,
                          };
                          // Uncheck others if this is primary
                          if (e.target.checked) {
                            updated.forEach((item, i) => {
                              if (i !== idx) item.isPrimary = false;
                            });
                          }
                          setNewPromptImages(updated);
                        }}
                      />
                      Primary
                    </label>
                    <button
                      onClick={() => {
                        if (newPromptImages.length > 1) {
                          setNewPromptImages(
                            newPromptImages.filter((_, i) => i !== idx)
                          );
                        }
                      }}
                      disabled={newPromptImages.length === 1}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 4,
                        border: "1px solid #ccc",
                        background:
                          newPromptImages.length === 1 ? "#f0f0f0" : "#fff",
                        cursor:
                          newPromptImages.length === 1
                            ? "not-allowed"
                            : "pointer",
                        fontSize: 11,
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setNewPromptImages([
                      ...newPromptImages,
                      { url: "", isPrimary: false },
                    ]);
                  }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "1px solid #4a90e2",
                    background: "#4a90e2",
                    color: "#fff",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  + Add Image
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={newPromptPublished}
                  onChange={(e) => setNewPromptPublished(e.target.checked)}
                />
                <label style={{ fontSize: 12, color: "#666" }}>Published</label>
              </div>
              <button
                onClick={createPrompt}
                disabled={promptsLoading}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #333",
                }}
              >
                {promptsLoading ? "Creating..." : "Create Prompt"}
              </button>
              {createPromptResult && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                    Result
                  </div>
                  {createPromptResult.encryptionStatus && (
                    <div
                      style={{
                        marginBottom: 8,
                        padding: 8,
                        background: createPromptResult.encryptionStatus
                          .hasEncryptedSegments
                          ? "#e8f5e9"
                          : "#fff3e0",
                        borderRadius: 6,
                        fontSize: 11,
                      }}
                    >
                      <strong>Encryption Status:</strong>
                      <div>
                        Encrypted Segments:{" "}
                        {createPromptResult.encryptionStatus
                          .encryptedSegmentsCount > 0
                          ? `✅ ${createPromptResult.encryptionStatus.encryptedSegmentsCount} segments encrypted`
                          : "❌ No encrypted segments found"}
                      </div>
                    </div>
                  )}
                  <pre
                    style={{
                      background: "#fafafa",
                      padding: 10,
                      borderRadius: 8,
                      overflow: "auto",
                      maxHeight: 120,
                    }}
                  >
                    {safeJson(createPromptResult)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
              GET /api/prompts/:id
            </h3>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={getPromptId}
                onChange={(e) => setGetPromptId(e.target.value)}
                placeholder="Prompt ID"
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={getPromptById}
                disabled={promptsLoading}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #333",
                }}
              >
                {promptsLoading ? "Loading..." : "Get Prompt"}
              </button>
            </div>
            {getPromptResult && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                  Result
                </div>
                {getPromptResult.encryptionStatus && (
                  <div
                    style={{
                      marginBottom: 8,
                      padding: 8,
                      background: getPromptResult.encryptionStatus
                        .hasEncryptedSegments
                        ? "#e8f5e9"
                        : "#fff3e0",
                      borderRadius: 6,
                      fontSize: 11,
                    }}
                  >
                    <strong>Encryption Status:</strong>
                    <div>
                      Encrypted Segments:{" "}
                      {getPromptResult.encryptionStatus.encryptedSegmentsCount >
                      0
                        ? `✅ ${getPromptResult.encryptionStatus.encryptedSegmentsCount} segments encrypted`
                        : "❌ No encrypted segments found"}
                    </div>
                  </div>
                )}
                <pre
                  style={{
                    background: "#fafafa",
                    padding: 10,
                    borderRadius: 8,
                    overflow: "auto",
                    maxHeight: 300,
                  }}
                >
                  {safeJson(getPromptResult)}
                </pre>
              </div>
            )}
          </div>

          <div
            style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
              PATCH /api/prompts/:id
            </h3>
            <div style={{ display: "grid", gap: 8 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Prompt ID
                </label>
                <input
                  value={patchPromptId}
                  onChange={(e) => setPatchPromptId(e.target.value)}
                  placeholder="Prompt ID"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Title (optional)
                </label>
                <input
                  value={patchTitle}
                  onChange={(e) => setPatchTitle(e.target.value)}
                  placeholder="New title"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Featured
                </label>
                <select
                  value={
                    patchFeatured === null
                      ? ""
                      : patchFeatured
                        ? "true"
                        : "false"
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    setPatchFeatured(val === "" ? null : val === "true");
                  }}
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                >
                  <option value="">No change</option>
                  <option value="true">Featured</option>
                  <option value="false">Not Featured</option>
                </select>
              </div>
              <button
                onClick={patchPrompt}
                disabled={promptsLoading}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #333",
                }}
              >
                {promptsLoading ? "Updating..." : "Update Prompt"}
              </button>
              {patchResult && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                    Result
                  </div>
                  <pre
                    style={{
                      background: "#fafafa",
                      padding: 10,
                      borderRadius: 8,
                      overflow: "auto",
                      maxHeight: 120,
                    }}
                  >
                    {safeJson(patchResult)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* END-TO-END GENERATION FLOW */}
        <section
          style={{
            border: "2px solid #4a90e2",
            borderRadius: 12,
            padding: 16,
            background: "#f8f9ff",
          }}
        >
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 4,
              color: "#4a90e2",
            }}
          >
            🎨 End-to-End Generation Flow
          </h2>
          <p style={{ fontSize: 12, color: "#666", marginBottom: 16 }}>
            Complete workflow: Load Prompt → Fill Variables → Create Generation
            → Complete with Image
          </p>

          <div style={{ display: "grid", gap: 20 }}>
            {/* Step 1: Load Prompt */}
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 16,
                background: "#fff",
              }}
            >
              <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>
                Step 1: Load Prompt
              </h3>
              <div
                style={{
                  display: "grid",
                  gap: 8,
                  gridTemplateColumns: "1fr auto",
                }}
              >
                <input
                  value={flowPromptId}
                  onChange={(e) => setFlowPromptId(e.target.value)}
                  placeholder="Enter Prompt ID"
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={loadFlowPrompt}
                  disabled={flowLoading}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "1px solid #4a90e2",
                    background: "#4a90e2",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: flowLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {flowLoading ? "Loading..." : "Load Prompt"}
                </button>
              </div>
              {flowPromptData && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                    Prompt Data
                  </div>
                  <div
                    style={{
                      background: "#f5f5f5",
                      padding: 10,
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  >
                    <div>
                      <strong>Title:</strong> {flowPromptData?.title || "N/A"}
                    </div>
                    <div>
                      <strong>Template:</strong>{" "}
                      {flowPromptData?.template || "N/A"}
                    </div>
                    <div>
                      <strong>Variables:</strong>{" "}
                      {flowPromptData?.promptData?.variables?.length || 0}
                    </div>
                    {flowPromptData?.promptData?.variables?.length > 0 && (
                      <div style={{ marginTop: 8 }}>
                        <strong>Variable Names:</strong>{" "}
                        {flowPromptData.promptData.variables
                          .map((v: any) => v?.name || v?.key || "?")
                          .join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Fill Variables */}
            {flowPromptData &&
              flowPromptData?.promptData?.variables?.length > 0 && (
                <div
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    padding: 16,
                    background: "#fff",
                  }}
                >
                  <h3
                    style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}
                  >
                    Step 2: Fill Variable Values
                  </h3>
                  <div
                    style={{
                      display: "grid",
                      gap: 12,
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                    }}
                  >
                    {flowPromptData.promptData.variables.map((v: any) => {
                      const varName = v?.name || v?.key || "";
                      return (
                        <div key={varName}>
                          <label
                            style={{
                              display: "block",
                              fontSize: 12,
                              color: "#666",
                              marginBottom: 4,
                            }}
                          >
                            {varName}
                          </label>
                          <input
                            value={flowVariables[varName] || ""}
                            onChange={(e) =>
                              setFlowVariables({
                                ...flowVariables,
                                [varName]: e.target.value,
                              })
                            }
                            placeholder={`Enter ${varName}`}
                            style={{
                              width: "100%",
                              padding: "8px 10px",
                              borderRadius: 8,
                              border: "1px solid #ccc",
                              fontSize: 12,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
                    <strong>User ID:</strong>{" "}
                    <input
                      value={newGenerationUserId}
                      onChange={(e) => setNewGenerationUserId(e.target.value)}
                      placeholder="User ID for generation"
                      style={{
                        marginLeft: 8,
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        fontSize: 12,
                        width: "200px",
                      }}
                    />
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
                    <strong>Final Prompt TTL (hours):</strong>{" "}
                    <input
                      type="number"
                      value={newGenerationFinalPromptTtlHours}
                      onChange={(e) =>
                        setNewGenerationFinalPromptTtlHours(e.target.value)
                      }
                      placeholder="24"
                      style={{
                        marginLeft: 8,
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: "1px solid #ccc",
                        fontSize: 12,
                        width: "100px",
                      }}
                    />
                  </div>
                </div>
              )}

            {/* Step 3: Create Generation */}
            {flowPromptData && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 16,
                  background: "#fff",
                }}
              >
                <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>
                  Step 3: Create Generation
                </h3>
                <button
                  onClick={createFlowGeneration}
                  disabled={flowLoading || !newGenerationUserId.trim()}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: "1px solid #4a90e2",
                    background: "#4a90e2",
                    color: "#fff",
                    fontWeight: 600,
                    cursor:
                      flowLoading || !newGenerationUserId.trim()
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {flowLoading ? "Creating..." : "Create Generation"}
                </button>
                {flowGenerationId && (
                  <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
                    <strong>Generation ID:</strong> {flowGenerationId}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: View Generation & Final Prompt */}
            {flowGenerationId && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 16,
                  background: "#fff",
                }}
              >
                <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>
                  Step 4: View Generation & Final Prompt
                </h3>
                <div
                  style={{
                    display: "grid",
                    gap: 8,
                    gridTemplateColumns: "1fr auto",
                  }}
                >
                  <input
                    value={flowGenerationId}
                    onChange={(e) => setFlowGenerationId(e.target.value)}
                    placeholder="Generation ID"
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    onClick={() => loadFlowGeneration()}
                    disabled={flowLoading}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 8,
                      border: "1px solid #4a90e2",
                      background: "#4a90e2",
                      color: "#fff",
                      fontWeight: 600,
                      cursor: flowLoading ? "not-allowed" : "pointer",
                    }}
                  >
                    {flowLoading ? "Loading..." : "Refresh"}
                  </button>
                </div>
                {flowGenerationData && (
                  <div style={{ marginTop: 12 }}>
                    <div
                      style={{ fontSize: 12, color: "#666", marginBottom: 6 }}
                    >
                      Generation Status
                    </div>
                    <div
                      style={{
                        background: "#f5f5f5",
                        padding: 10,
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    >
                      <div>
                        <strong>Status:</strong>{" "}
                        {flowGenerationData?.status || "N/A"}
                      </div>
                      <div>
                        <strong>Created At:</strong>{" "}
                        {flowGenerationData?.createdAt || "N/A"}
                      </div>
                      {flowGenerationData?.finalPrompt && (
                        <div style={{ marginTop: 8 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              marginBottom: 4,
                            }}
                          >
                            <strong>Final Prompt:</strong>
                            {isEncryptedPayload(
                              flowGenerationData.finalPrompt
                            ) && (
                              <button
                                onClick={() =>
                                  loadFlowGeneration(
                                    undefined,
                                    !showDecryptedPrompt
                                  )
                                }
                                disabled={flowLoading}
                                style={{
                                  padding: "4px 8px",
                                  borderRadius: 4,
                                  border: "1px solid #4a90e2",
                                  background: showDecryptedPrompt
                                    ? "#4a90e2"
                                    : "transparent",
                                  color: showDecryptedPrompt
                                    ? "#fff"
                                    : "#4a90e2",
                                  fontSize: 11,
                                  cursor: flowLoading
                                    ? "not-allowed"
                                    : "pointer",
                                }}
                              >
                                {showDecryptedPrompt ? "Hide" : "Decrypt"}
                              </button>
                            )}
                          </div>
                          <div
                            style={{
                              marginTop: 4,
                              padding: 8,
                              background: "#fff",
                              borderRadius: 4,
                              fontSize: 11,
                              wordBreak: "break-all",
                            }}
                          >
                            {showDecryptedPrompt && decryptedFinalPrompt ? (
                              <div>
                                <div
                                  style={{ color: "#28a745", marginBottom: 4 }}
                                >
                                  ✓ Decrypted:
                                </div>
                                <div
                                  style={{
                                    fontFamily: "monospace",
                                    whiteSpace: "pre-wrap",
                                  }}
                                >
                                  {decryptedFinalPrompt}
                                </div>
                                {flowGenerationData.finalPrompt?.expiresAt && (
                                  <div
                                    style={{
                                      marginTop: 4,
                                      fontSize: 10,
                                      color: "#999",
                                    }}
                                  >
                                    Expires:{" "}
                                    {flowGenerationData.finalPrompt.expiresAt}
                                  </div>
                                )}
                              </div>
                            ) : isEncryptedPayload(
                                flowGenerationData.finalPrompt
                              ) ? (
                              <span style={{ color: "#4a90e2" }}>
                                ✓ Encrypted (Expires:{" "}
                                {flowGenerationData.finalPrompt?.expiresAt ||
                                  "N/A"}
                                )
                              </span>
                            ) : (
                              <span>
                                {safeJson(flowGenerationData.finalPrompt)}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      {flowGenerationData?.generatedImage && (
                        <div style={{ marginTop: 8 }}>
                          <strong>Generated Image:</strong>{" "}
                          <a
                            href={flowGenerationData.generatedImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#4a90e2" }}
                          >
                            {flowGenerationData.generatedImage}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Simulate Image Generation */}
            {flowGenerationId && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 16,
                  background: "#fff",
                }}
              >
                <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>
                  Step 5: Simulate Image Generation
                </h3>
                <div style={{ marginBottom: 8 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Generated Image URL
                  </label>
                  <input
                    value={flowImageUrl}
                    onChange={(e) => setFlowImageUrl(e.target.value)}
                    placeholder="https://example.com/image.png"
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
                <div
                  style={{ fontSize: 12, color: "#999", fontStyle: "italic" }}
                >
                  In production, this would be the result from your AI image
                  generation service.
                </div>
              </div>
            )}

            {/* Step 6: Complete Generation */}
            {flowGenerationId && (
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 12,
                  padding: 16,
                  background: "#fff",
                }}
              >
                <h3 style={{ fontWeight: 700, marginBottom: 12, fontSize: 16 }}>
                  Step 6: Complete Generation
                </h3>
                <button
                  onClick={completeFlowGeneration}
                  disabled={flowLoading}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 8,
                    border: "1px solid #28a745",
                    background: "#28a745",
                    color: "#fff",
                    fontWeight: 600,
                    cursor: flowLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {flowLoading ? "Completing..." : "Mark as Completed"}
                </button>
                <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
                  This will update the generation status to "completed" and set
                  the generated image URL.
                </div>
              </div>
            )}
          </div>
        </section>

        {/* GENERATIONS */}
        <section
          style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16 }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
            Generations
          </h2>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
              GET /api/generations
            </h3>
            <div
              style={{
                display: "grid",
                gap: 8,
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  User ID
                </label>
                <input
                  value={generationFilterUserId}
                  onChange={(e) => setGenerationFilterUserId(e.target.value)}
                  placeholder="User ID"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Prompt ID
                </label>
                <input
                  value={generationFilterPromptId}
                  onChange={(e) => setGenerationFilterPromptId(e.target.value)}
                  placeholder="Prompt ID"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Status
                </label>
                <select
                  value={generationFilterStatus}
                  onChange={(e) => setGenerationFilterStatus(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Limit
                </label>
                <input
                  type="number"
                  value={generationFilterLimit}
                  onChange={(e) =>
                    setGenerationFilterLimit(Number(e.target.value) || 20)
                  }
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
            </div>
            <button
              onClick={loadGenerations}
              disabled={generationsLoading}
              style={{
                marginTop: 12,
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #333",
              }}
            >
              {generationsLoading ? "Loading..." : "Load Generations"}
            </button>
            {generationsResult && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                  Result
                </div>
                <pre
                  style={{
                    background: "#fafafa",
                    padding: 10,
                    borderRadius: 8,
                    overflow: "auto",
                    maxHeight: 300,
                  }}
                >
                  {safeJson(generationsResult)}
                </pre>
              </div>
            )}
          </div>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
              POST /api/generations
            </h3>
            <div style={{ display: "grid", gap: 8 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 8,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    User ID *
                  </label>
                  <input
                    value={newGenerationUserId}
                    onChange={(e) => setNewGenerationUserId(e.target.value)}
                    placeholder="User ID"
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Prompt ID *
                  </label>
                  <input
                    value={newGenerationPromptId}
                    onChange={(e) => setNewGenerationPromptId(e.target.value)}
                    placeholder="Prompt ID"
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: 8,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Aspect Ratio (optional)
                  </label>
                  <input
                    value={newGenerationAspectRatio}
                    onChange={(e) =>
                      setNewGenerationAspectRatio(e.target.value)
                    }
                    placeholder="1:1"
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 20,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={newGenerationIncludeText}
                    onChange={(e) =>
                      setNewGenerationIncludeText(e.target.checked)
                    }
                  />
                  <label style={{ fontSize: 12, color: "#666" }}>
                    Include Text
                  </label>
                </div>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Variable Values (JSON array or "name:value, name2:value2")
                </label>
                <textarea
                  value={newGenerationVariableValues}
                  onChange={(e) =>
                    setNewGenerationVariableValues(e.target.value)
                  }
                  placeholder='[{"variableName": "subject", "value": "runner"}] or subject:runner, color:blue'
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                    minHeight: 60,
                    fontFamily: "monospace",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Final Prompt TTL (hours, optional, default: 24)
                </label>
                <input
                  type="number"
                  value={newGenerationFinalPromptTtlHours}
                  onChange={(e) =>
                    setNewGenerationFinalPromptTtlHours(e.target.value)
                  }
                  placeholder="24"
                  min="1"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type="checkbox"
                  checked={newGenerationIsPrivate}
                  onChange={(e) => setNewGenerationIsPrivate(e.target.checked)}
                />
                <label style={{ fontSize: 12, color: "#666" }}>Private</label>
              </div>
              <button
                onClick={createGeneration}
                disabled={generationsLoading}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #333",
                }}
              >
                {generationsLoading ? "Creating..." : "Create Generation"}
              </button>
              {createGenerationResult && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                    Result
                  </div>
                  {createGenerationResult.encryptionStatus && (
                    <div
                      style={{
                        marginBottom: 8,
                        padding: 8,
                        background: createGenerationResult.encryptionStatus
                          .hasFinalPrompt
                          ? "#e8f5e9"
                          : "#fff3e0",
                        borderRadius: 6,
                        fontSize: 11,
                      }}
                    >
                      <strong>Encryption Status:</strong>
                      <div>
                        Final Prompt:{" "}
                        {createGenerationResult.encryptionStatus.hasFinalPrompt
                          ? "✅ Encrypted"
                          : "❌ Not encrypted"}
                      </div>
                      {createGenerationResult.encryptionStatus
                        .finalPromptExpiresAt && (
                        <div>
                          Expires At:{" "}
                          {new Date(
                            createGenerationResult.encryptionStatus
                              .finalPromptExpiresAt
                          ).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                  <pre
                    style={{
                      background: "#fafafa",
                      padding: 10,
                      borderRadius: 8,
                      overflow: "auto",
                      maxHeight: 120,
                    }}
                  >
                    {safeJson(createGenerationResult)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
              GET /api/generations/:id
            </h3>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={getGenerationId}
                onChange={(e) => setGetGenerationId(e.target.value)}
                placeholder="Generation ID"
                style={{
                  flex: 1,
                  padding: 8,
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={getGenerationById}
                disabled={generationsLoading}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #333",
                }}
              >
                {generationsLoading ? "Loading..." : "Get Generation"}
              </button>
            </div>
            {getGenerationResult && (
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                  Result
                </div>
                {getGenerationResult.encryptionStatus && (
                  <div
                    style={{
                      marginBottom: 8,
                      padding: 8,
                      background: getGenerationResult.encryptionStatus
                        .hasFinalPrompt
                        ? "#e8f5e9"
                        : "#fff3e0",
                      borderRadius: 6,
                      fontSize: 11,
                    }}
                  >
                    <strong>Encryption Status:</strong>
                    <div>
                      Final Prompt:{" "}
                      {getGenerationResult.encryptionStatus.hasFinalPrompt
                        ? "✅ Encrypted"
                        : "❌ Not encrypted"}
                    </div>
                    {getGenerationResult.encryptionStatus
                      .finalPromptExpiresAt && (
                      <div>
                        Expires At:{" "}
                        {new Date(
                          getGenerationResult.encryptionStatus
                            .finalPromptExpiresAt
                        ).toLocaleString()}
                      </div>
                    )}
                  </div>
                )}
                <pre
                  style={{
                    background: "#fafafa",
                    padding: 10,
                    borderRadius: 8,
                    overflow: "auto",
                    maxHeight: 300,
                  }}
                >
                  {safeJson(getGenerationResult)}
                </pre>
              </div>
            )}
          </div>

          <div
            style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}
          >
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>
              PATCH /api/generations/:id
            </h3>
            <div style={{ display: "grid", gap: 8 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Generation ID
                </label>
                <input
                  value={patchGenerationId}
                  onChange={(e) => setPatchGenerationId(e.target.value)}
                  placeholder="Generation ID"
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Status
                </label>
                <select
                  value={patchGenerationStatus}
                  onChange={(e) => setPatchGenerationStatus(e.target.value)}
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                >
                  <option value="">No change</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    color: "#666",
                    marginBottom: 4,
                  }}
                >
                  Private
                </label>
                <select
                  value={
                    patchGenerationIsPrivate === null
                      ? ""
                      : patchGenerationIsPrivate
                        ? "true"
                        : "false"
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    setPatchGenerationIsPrivate(
                      val === "" ? null : val === "true"
                    );
                  }}
                  style={{
                    width: "100%",
                    padding: 6,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    fontSize: 12,
                  }}
                >
                  <option value="">No change</option>
                  <option value="true">Private</option>
                  <option value="false">Public</option>
                </select>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 8,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Likes (optional)
                  </label>
                  <input
                    type="number"
                    value={patchGenerationLikes}
                    onChange={(e) => setPatchGenerationLikes(e.target.value)}
                    placeholder="0"
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "#666",
                      marginBottom: 4,
                    }}
                  >
                    Bookmarks (optional)
                  </label>
                  <input
                    type="number"
                    value={patchGenerationBookmarks}
                    onChange={(e) =>
                      setPatchGenerationBookmarks(e.target.value)
                    }
                    placeholder="0"
                    style={{
                      width: "100%",
                      padding: 6,
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      fontSize: 12,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={patchGeneration}
                disabled={generationsLoading}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid #333",
                }}
              >
                {generationsLoading ? "Updating..." : "Update Generation"}
              </button>
              {patchGenerationResult && (
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                    Result
                  </div>
                  <pre
                    style={{
                      background: "#fafafa",
                      padding: 10,
                      borderRadius: 8,
                      overflow: "auto",
                      maxHeight: 120,
                    }}
                  >
                    {safeJson(patchGenerationResult)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
