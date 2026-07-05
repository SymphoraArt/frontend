import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { encryptPrompt } from "@/backend/encryption";

/* ──────────────────────────────────────────────────────────────
   Example prompts seeded into the marketplace/showcase feed.

   These power the two demo cards in /showcase:
     • One FREE prompt (no variables) — pure showcase.
     • One PAID prompt with a few variables the buyer can tune.

   Cover images are local assets under /public/examples so the
   seed has no external image dependency. `uploaded_photos[0]` is
   what `/api/prompts` turns into the card thumbnail (see
   `deriveThumbnail` in app/api/prompts/route.ts).

   The whole route is idempotent: each prompt is keyed by its
   title and skipped if it already exists.
   ────────────────────────────────────────────────────────────── */

const FREE_IMAGE_URL = "/examples/example-free-riverside.png";
const PAID_IMAGE_URL = "/examples/example-paid-terrace.png";

type SeedVariable = {
  name: string;
  label: string;
  description: string;
  type: "text" | "checkbox" | "image";
  defaultValue: string | boolean;
  required: boolean;
  position: number;
};

type SeedPrompt = {
  title: string;
  body: string;
  category: string;
  tags: string[];
  price: number;
  promptType: "free-prompt" | "premium-prompt";
  isFreeShowcase: boolean;
  aspectRatio: string;
  coverImage: string;
  variables: SeedVariable[];
};

/* FREE — riverside summer scene, no variables. */
const FREE_PROMPT: SeedPrompt = {
  title: "Riverside Summer Promenade",
  body: `A bright editorial summer photograph of a lively riverside promenade, a vintage red mobile espresso cart with people queuing in light linen outfits, a calm river reflecting a historic brick double-arch bridge in the background, elegant old facades along the far bank, cobblestone pavement catching warm midday sun, candid lifestyle composition, crisp natural light, deep blue cloudless sky, premium travel-magazine look, true-to-life colors, sharp focus, high dynamic range, 16:9.`,
  category: "Lifestyle",
  tags: ["lifestyle", "summer", "city", "editorial", "travel"],
  price: 0,
  promptType: "free-prompt",
  isFreeShowcase: true,
  aspectRatio: "16:9",
  coverImage: FREE_IMAGE_URL,
  variables: [],
};

/* PAID — terrace scene template the buyer can re-style through
   variables. Mirrors the editor's variable model: text inputs
   plus one Yes/No checkbox (watermark). */
const PAID_PROMPT: SeedPrompt = {
  title: "Cobblestone Terrace — Art Direction Kit",
  body: `A refined architectural photograph of [subject] on a wide cobblestone terrace beneath large parasols, [mood] atmosphere, a dominant [color] palette washing across the stone and facade, rendered in [style], balanced editorial composition, true-to-life textures on weathered stone and sandstone walls, soft directional daylight, crisp shadows, premium design-journal aesthetic, high detail, 16:9[watermark].`,
  category: "Architecture",
  tags: ["architecture", "editorial", "template", "art-direction"],
  price: 1.2,
  promptType: "premium-prompt",
  isFreeShowcase: false,
  aspectRatio: "16:9",
  coverImage: PAID_IMAGE_URL,
  variables: [
    {
      name: "subject",
      label: "Subject",
      description: "The main subject placed in the scene",
      type: "text",
      defaultValue: "a lone café table set for two",
      required: true,
      position: 0,
    },
    {
      name: "mood",
      label: "Mood",
      description: "Emotional atmosphere of the scene",
      type: "text",
      defaultValue: "quiet late-afternoon calm",
      required: false,
      position: 1,
    },
    {
      name: "color",
      label: "Color",
      description: "Dominant color palette",
      type: "text",
      defaultValue: "warm sandstone and muted terracotta",
      required: false,
      position: 2,
    },
    {
      name: "style",
      label: "Style",
      description: "Overall art style / rendering treatment",
      type: "text",
      defaultValue: "fine-art editorial photography",
      required: false,
      position: 3,
    },
    {
      name: "watermark",
      label: "Watermark",
      description: ", subtle studio watermark in the lower corner",
      type: "checkbox",
      defaultValue: false,
      required: false,
      position: 4,
    },
  ],
};

const SEED_PROMPTS: SeedPrompt[] = [FREE_PROMPT, PAID_PROMPT];

async function seedOne(
  supabase: ReturnType<typeof getSupabaseServerClient>,
  prompt: SeedPrompt
): Promise<{ title: string; id: string; seeded: boolean }> {
  // Idempotent: skip if a prompt with this title already exists.
  const { data: existing } = await supabase
    .from("prompts")
    .select("id")
    .eq("title", prompt.title)
    .maybeSingle();

  if (existing) {
    return { title: prompt.title, id: String(existing.id), seeded: false };
  }

  const encrypted = encryptPrompt(prompt.body);
  const nowIso = new Date().toISOString();

  const promptRow = {
    title: prompt.title,
    encrypted_content: encrypted.encryptedContent,
    iv: encrypted.iv,
    auth_tag: encrypted.authTag,
    user_id: null,
    category: prompt.category,
    tags: prompt.tags,
    ai_model: "gemini-2.5-flash-image",
    price: prompt.price,
    aspect_ratio: prompt.aspectRatio,
    photo_count: 1,
    prompt_type: prompt.promptType,
    uploaded_photos: [prompt.coverImage],
    resolution: "2K",
    is_free_showcase: prompt.isFreeShowcase,
    // Only expose the raw prompt text for free showcases; paid
    // prompts keep their body encrypted/hidden.
    public_prompt_text: prompt.isFreeShowcase ? prompt.body : null,
    created_at: nowIso,
    updated_at: nowIso,
    downloads: 0,
    rating: 0,
  };

  const { data: inserted, error: insertError } = await supabase
    .from("prompts")
    .insert(promptRow)
    .select("id")
    .single();

  if (insertError || !inserted) {
    throw insertError ?? new Error(`Failed to insert seed prompt: ${prompt.title}`);
  }

  const promptId = String(inserted.id);

  if (prompt.variables.length > 0) {
    const variableRows = prompt.variables.map((v) => ({
      prompt_id: promptId,
      name: v.name,
      label: v.label,
      description: v.description,
      type: v.type,
      default_value: v.defaultValue,
      required: v.required,
      position: v.position,
      created_at: nowIso,
      updated_at: nowIso,
    }));

    const { error: varsError } = await supabase
      .from("variables")
      .insert(variableRows);

    if (varsError) {
      console.error(`Seed variable insert error (${prompt.title}):`, varsError);
    }
  }

  return { title: prompt.title, id: promptId, seeded: true };
}

export async function POST(req: NextRequest) {
  // This route writes example prompts straight into the marketplace. It's a
  // dev/setup tool, not a user endpoint — gate it so it can't be hit anonymously
  // in production. Requires SEED_SECRET to be set and matched via the
  // `x-seed-secret` header (or `?secret=` query param).
  const configured = process.env.SEED_SECRET;
  if (!configured) {
    return NextResponse.json(
      { error: "Seeding is disabled (SEED_SECRET not configured)" },
      { status: 403 },
    );
  }
  const provided =
    req.headers.get("x-seed-secret") ??
    req.nextUrl.searchParams.get("secret") ??
    "";
  if (provided !== configured) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const supabase = getSupabaseServerClient();

    const results = [];
    for (const prompt of SEED_PROMPTS) {
      results.push(await seedOne(supabase, prompt));
    }

    const seededCount = results.filter((r) => r.seeded).length;

    return NextResponse.json({
      success: true,
      message:
        seededCount > 0
          ? `Seeded ${seededCount} example prompt(s)`
          : "All example prompts already exist",
      results,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("Seed error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
