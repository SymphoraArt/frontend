/**
 * GET /api/users/[id]/settings
 * PUT /api/users/[id]/settings
 * Manage user preferences and settings
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient, getSupabaseServerClientSafe } from "@/lib/supabaseServer";

interface UserSettings {
  // Profile
  displayName?: string;
  showWalletInProfile?: boolean;
  showEarningsPublicly?: boolean;

  // UI theme
  theme?: "light" | "dark";

  // Generation defaults
  defaultModel?: string;
  defaultAspectRatio?: string;
  defaultResolution?: string;

  // Creator settings
  defaultLicense?: string;
  autoListPrompts?: boolean;
  minimumPrice?: string;

  // Privacy
  showPurchaseHistory?: boolean;
  showCreatedPrompts?: boolean;
  allowAnalytics?: boolean;

  /** User specialty: "normal" (7% fee), "family" (1% fee), "admin" (0% fee). */
  specialty?: "normal" | "family" | "admin";

  // Notifications
  salesNotifications?: boolean;
  purchaseNotifications?: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClientSafe();
    if (!supabase) {
      return NextResponse.json({ settings: getDefaultSettings() });
    }

    let user: { id: string; display_name: string | null; preferences: unknown; wallet_address?: string } | null = null;
    let err: unknown = null;

    let result = await supabase
      .from("users")
      .select("id, display_name, preferences, wallet_address")
      .eq("id", userId)
      .maybeSingle();
    if (result.error) err = result.error;
    else if (result.data) user = result.data;

    if (!user) {
      result = await supabase
        .from("users")
        .select("id, display_name, preferences, wallet_address")
        .eq("wallet_address", userId.toLowerCase())
        .maybeSingle();
      if (result.error) err = result.error;
      else if (result.data) user = result.data;
    }

    if (err) {
      console.error("Error fetching user settings:", err);
    }

    if (!user) {
      return NextResponse.json({ settings: getDefaultSettings() });
    }

    // Merge stored preferences with display_name
    const preferences = (user.preferences as UserSettings) || {};
    const settings: UserSettings = {
      ...getDefaultSettings(),
      ...preferences,
      displayName: user.display_name || preferences.displayName || "",
    };

    return NextResponse.json({ settings });

  } catch (error) {
    console.error("Error in GET /api/users/[id]/settings:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json() as { settings: UserSettings };

    if (!body.settings) {
      return NextResponse.json(
        { error: "Settings object is required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();

    // Extract display_name separately as it's stored in the main users table
    const { displayName, ...preferences } = body.settings;

    // Update both display_name and preferences
    const updateData: {
      display_name?: string;
      preferences?: UserSettings;
      updated_at?: string;
      wallet_address?: string;
    } = {
      updated_at: new Date().toISOString(),
    };

    if (displayName !== undefined) {
      updateData.display_name = displayName;
    }

    if (Object.keys(preferences).length > 0) {
      updateData.preferences = preferences as UserSettings;
    }

    // Try to update by ID first
    let { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId)
      .select("id, display_name, preferences")
      .maybeSingle();

    // If not found, try by wallet_address or create user record
    if (!data && !error) {
      // Check if wallet_address column exists and try that
      const { data: userByWallet } = await supabase
        .from("users")
        .select("id")
        .eq("wallet_address", userId.toLowerCase())
        .maybeSingle();

      if (userByWallet) {
        // Update existing user found by wallet address
        const result = await supabase
          .from("users")
          .update(updateData)
          .eq("wallet_address", userId.toLowerCase())
          .select("id, display_name, preferences")
          .single();
        data = result.data;
        error = result.error;
      } else {
        // User doesn't exist - create a basic user record
        // Note: This requires username, so we'll use a placeholder
        const result = await supabase
          .from("users")
          .insert({
            username: `user_${userId.slice(2, 10)}`, // Generate username from address
            display_name: displayName || "",
            wallet_address: userId.toLowerCase(),
            preferences: preferences as UserSettings,
            stats: {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select("id, display_name, preferences")
          .single();
        data = result.data;
        error = result.error;
      }
    }

    if (error) {
      console.error("Error updating user settings:", error);

      if (error.code === "PGRST116" || error.message?.includes("No rows")) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      const message = typeof error.message === "string" ? error.message : "Failed to update settings";
      return NextResponse.json(
        { error: message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      settings: {
        ...getDefaultSettings(),
        ...((data.preferences as UserSettings) || {}),
        displayName: data.display_name || "",
      },
    });

  } catch (error) {
    console.error("Error in PUT /api/users/[id]/settings:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}

function getDefaultSettings(): UserSettings {
  return {
    displayName: "",
    showWalletInProfile: true,
    showEarningsPublicly: false,
    theme: "light",
    defaultModel: "gemini-2.0-flash-exp",
    defaultAspectRatio: "1:1",
    defaultResolution: "1024x1024",
    defaultLicense: "personal",
    autoListPrompts: false,
    minimumPrice: "5.00",
    showPurchaseHistory: false,
    showCreatedPrompts: true,
    allowAnalytics: true,
    salesNotifications: true,
    purchaseNotifications: true,
    specialty: "normal",
  };
}
