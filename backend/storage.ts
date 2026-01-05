import {
  type User,
  type InsertUser,
  type Prompt,
  type InsertPrompt,
  type Variable,
  type InsertVariable,
  type Artist,
  type InsertArtist,
  type Artwork,
  type InsertArtwork,
  type GeneratedVariation,
  type InsertGeneratedVariation,
  type ArtworkComment,
  type InsertArtworkComment,
} from "@shared/schema";
import { db } from "./db";
import { ObjectId } from "mongodb";
import { encryptPrompt, decryptPrompt } from "./encryption";

const COLLECTIONS = {
  USERS: 'users',
  PROMPTS: 'prompts',
  VARIABLES: 'variables',
  ARTISTS: 'artists',
  ARTWORKS: 'artworks',
  GENERATED_VARIATIONS: 'generated_variations',
  ARTWORK_COMMENTS: 'artwork_comments',
} as const;

// Check if running in dummy mode (no database)
const isDummyMode = !db;

// Helper function to convert MongoDB document to schema type
function toSchemaType<T>(doc: any): T {
  if (!doc) return doc;
  return {
    ...doc,
    _id: doc._id instanceof ObjectId ? doc._id.toString() : doc._id,
  } as T;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getPrompt(id: string): Promise<(Prompt & { decryptedContent?: string }) | undefined>;
  getPromptBySlug(slug: string): Promise<Prompt | undefined>;
  getPromptWithDecryptedContent(id: string): Promise<(Prompt & { decryptedContent: string }) | undefined>;
  getAllPrompts(): Promise<Prompt[]>;
  getPublicPrompts(): Promise<Prompt[]>;
  getPromptsByArtistId(artistId: string): Promise<Prompt[]>;
  createPrompt(promptData: { content: string } & Omit<InsertPrompt, 'encryptedContent' | 'iv' | 'authTag'>): Promise<Prompt>;
  updatePrompt(id: string, promptData: Partial<{ content: string } & Omit<InsertPrompt, 'encryptedContent' | 'iv' | 'authTag'>>): Promise<Prompt | undefined>;
  deletePrompt(id: string): Promise<boolean>;

  getVariablesByPromptId(promptId: string): Promise<Variable[]>;
  createVariable(variable: InsertVariable): Promise<Variable>;
  updateVariable(id: string, variable: Partial<InsertVariable>): Promise<Variable | undefined>;
  deleteVariable(id: string): Promise<boolean>;
  deleteVariablesByPromptId(promptId: string): Promise<void>;

  getArtist(id: string): Promise<Artist | undefined>;
  getArtistByUsername(username: string): Promise<Artist | undefined>;
  getAllArtists(): Promise<Artist[]>;
  createArtist(artist: InsertArtist): Promise<Artist>;
  updateArtist(id: string, artist: Partial<InsertArtist>): Promise<Artist | undefined>;

  getArtwork(id: string): Promise<Artwork | undefined>;
  getArtworksByArtistId(artistId: string): Promise<Artwork[]>;
  getAllArtworks(): Promise<Artwork[]>;
  getPublicArtworks(): Promise<Artwork[]>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  updateArtwork(id: string, artwork: Partial<InsertArtwork>): Promise<Artwork | undefined>;
  deleteArtwork(id: string): Promise<boolean>;

  getVariationsByArtworkId(artworkId: string): Promise<GeneratedVariation[]>;
  createVariation(variation: InsertGeneratedVariation): Promise<GeneratedVariation>;

  getCommentsByArtworkId(artworkId: string): Promise<ArtworkComment[]>;
  createComment(comment: InsertArtworkComment): Promise<ArtworkComment>;
}

export class DatabaseStorage implements IStorage {
  // ==================== Users ====================
  async getUser(id: string): Promise<User | undefined> {
    if (isDummyMode) return undefined;
    try {
      const user = await db.collection(COLLECTIONS.USERS).findOne({
        _id: new ObjectId(id)
      });
      if (!user) return undefined;
      return toSchemaType<User>(user);
    } catch {
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (isDummyMode) return undefined;
    const user = await db.collection(COLLECTIONS.USERS).findOne({ username });
    if (!user) return undefined;
    return toSchemaType<User>(user);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (isDummyMode) {
      return {
        id: new ObjectId().toString(),
        ...insertUser,
      } as User;
    }
    const result = await db.collection(COLLECTIONS.USERS).insertOne({
      ...insertUser,
      createdAt: new Date(),
    });
    const user = await db.collection(COLLECTIONS.USERS).findOne({
      _id: result.insertedId
    });
    if (!user) throw new Error('Failed to create user');
    return toSchemaType<User>(user);
  }

  // ==================== Prompts ====================
  async getPrompt(id: string): Promise<Prompt | undefined> {
    if (isDummyMode) return undefined;
    try {
      const prompt = await db.collection(COLLECTIONS.PROMPTS).findOne({
        _id: new ObjectId(id)
      });
      if (!prompt) return undefined;
      return toSchemaType<Prompt>(prompt);
    } catch {
      return undefined;
    }
  }

  async getPromptBySlug(slug: string): Promise<Prompt | undefined> {
    if (isDummyMode) return undefined;
    const normalizedSlug = slug.toLowerCase().replace(/-/g, ' ');
    const allPrompts = await db.collection(COLLECTIONS.PROMPTS)
      .find({})
      .toArray();

    const prompt = allPrompts.find((p: any) => {
      const title = (p.title as string).toLowerCase();
      return title === normalizedSlug ||
        title.replace(/\s+/g, '-') === slug.toLowerCase();
    });

    if (!prompt) return undefined;
    return toSchemaType<Prompt>(prompt);
  }

  async getPromptWithDecryptedContent(id: string): Promise<(Prompt & { decryptedContent: string }) | undefined> {
    if (isDummyMode) return undefined;
    const prompt = await this.getPrompt(id);
    if (!prompt) return undefined;

    const decryptedContent = decryptPrompt({
      encryptedContent: prompt.encryptedContent,
      iv: prompt.iv,
      authTag: prompt.authTag
    });

    return { ...prompt, decryptedContent };
  }

  async getAllPrompts(): Promise<Prompt[]> {
    if (isDummyMode) return [];
    const prompts = await db.collection(COLLECTIONS.PROMPTS)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return prompts.map((p: any) => toSchemaType<Prompt>(p));
  }

  async getPublicPrompts(): Promise<Prompt[]> {
    if (isDummyMode) return [];
    const prompts = await db.collection(COLLECTIONS.PROMPTS)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return prompts.map((p: any) => toSchemaType<Prompt>(p));
  }

  async getPromptsByArtistId(artistId: string): Promise<Prompt[]> {
    if (isDummyMode) return [];
    const prompts = await db.collection(COLLECTIONS.PROMPTS)
      .find({ artistId })
      .sort({ createdAt: -1 })
      .toArray();
    return prompts.map((p: any) => toSchemaType<Prompt>(p));
  }

  async createPrompt(promptData: { content: string } & Omit<InsertPrompt, 'encryptedContent' | 'iv' | 'authTag'>): Promise<Prompt> {
    const { content, ...rest } = promptData;
    const encrypted = encryptPrompt(content);

    if (isDummyMode) {
      return {
        id: new ObjectId().toString(),
        ...rest,
        encryptedContent: encrypted.encryptedContent,
        iv: encrypted.iv,
        authTag: encrypted.authTag,
        createdAt: new Date().toISOString(),
      } as Prompt;
    }

    const result = await db.collection(COLLECTIONS.PROMPTS).insertOne({
      ...rest,
      encryptedContent: encrypted.encryptedContent,
      iv: encrypted.iv,
      authTag: encrypted.authTag,
      createdAt: new Date(),
    });

    const prompt = await db.collection(COLLECTIONS.PROMPTS).findOne({
      _id: result.insertedId
    });
    if (!prompt) throw new Error('Failed to create prompt');
    return toSchemaType<Prompt>(prompt);
  }

  async updatePrompt(id: string, promptData: Partial<{ content: string } & Omit<InsertPrompt, 'encryptedContent' | 'iv' | 'authTag'>>): Promise<Prompt | undefined> {
    if (isDummyMode) return undefined;
    const { content, ...rest } = promptData;

    let updateData: any = { ...rest };

    if (content !== undefined) {
      const encrypted = encryptPrompt(content);
      updateData = {
        ...updateData,
        encryptedContent: encrypted.encryptedContent,
        iv: encrypted.iv,
        authTag: encrypted.authTag
      };
    }

    try {
      const result = await db.collection(COLLECTIONS.PROMPTS).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
      );

      if (!result) return undefined;
      return toSchemaType<Prompt>(result);
    } catch {
      return undefined;
    }
  }

  async deletePrompt(id: string): Promise<boolean> {
    if (isDummyMode) return false;
    try {
      const result = await db.collection(COLLECTIONS.PROMPTS).deleteOne({
        _id: new ObjectId(id)
      });
      return result.deletedCount > 0;
    } catch {
      return false;
    }
  }

  // ==================== Variables ====================
  async getVariablesByPromptId(promptId: string): Promise<Variable[]> {
    if (isDummyMode) return [];
    const variables = await db.collection(COLLECTIONS.VARIABLES)
      .find({ promptId })
      .sort({ position: 1 })
      .toArray();
    return variables.map((v: any) => toSchemaType<Variable>(v));
  }

  async createVariable(insertVariable: InsertVariable): Promise<Variable> {
    if (isDummyMode) {
      return {
        id: new ObjectId().toString(),
        ...insertVariable,
      } as Variable;
    }
    const result = await db.collection(COLLECTIONS.VARIABLES).insertOne(insertVariable);
    const variable = await db.collection(COLLECTIONS.VARIABLES).findOne({
      _id: result.insertedId
    });
    if (!variable) throw new Error('Failed to create variable');
    return toSchemaType<Variable>(variable);
  }

  async updateVariable(id: string, update: Partial<InsertVariable>): Promise<Variable | undefined> {
    if (isDummyMode) return undefined;
    try {
      const result = await db.collection(COLLECTIONS.VARIABLES).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        { returnDocument: 'after' }
      );
      if (!result) return undefined;
      return toSchemaType<Variable>(result);
    } catch {
      return undefined;
    }
  }

  async deleteVariable(id: string): Promise<boolean> {
    if (isDummyMode) return false;
    try {
      const result = await db.collection(COLLECTIONS.VARIABLES).deleteOne({
        _id: new ObjectId(id)
      });
      return result.deletedCount > 0;
    } catch {
      return false;
    }
  }

  async deleteVariablesByPromptId(promptId: string): Promise<void> {
    if (isDummyMode) return;
    await db.collection(COLLECTIONS.VARIABLES).deleteMany({ promptId });
  }

  // ==================== Artists ====================
  async getArtist(id: string): Promise<Artist | undefined> {
    if (isDummyMode) return undefined;
    try {
      const artist = await db.collection(COLLECTIONS.ARTISTS).findOne({
        _id: new ObjectId(id)
      });
      if (!artist) return undefined;
      return toSchemaType<Artist>(artist);
    } catch {
      return undefined;
    }
  }

  async getArtistByUsername(username: string): Promise<Artist | undefined> {
    if (isDummyMode) return undefined;
    const artist = await db.collection(COLLECTIONS.ARTISTS).findOne({ username });
    if (!artist) return undefined;
    return toSchemaType<Artist>(artist);
  }

  async getAllArtists(): Promise<Artist[]> {
    if (isDummyMode) return [];
    const artists = await db.collection(COLLECTIONS.ARTISTS)
      .find({})
      .toArray();
    return artists.map((a: any) => toSchemaType<Artist>(a));
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    if (isDummyMode) {
      return {
        id: new ObjectId().toString(),
        ...insertArtist,
      } as Artist;
    }
    const result = await db.collection(COLLECTIONS.ARTISTS).insertOne(insertArtist);
    const artist = await db.collection(COLLECTIONS.ARTISTS).findOne({
      _id: result.insertedId
    });
    if (!artist) throw new Error('Failed to create artist');
    return toSchemaType<Artist>(artist);
  }

  async updateArtist(id: string, update: Partial<InsertArtist>): Promise<Artist | undefined> {
    if (isDummyMode) return undefined;
    try {
      const result = await db.collection(COLLECTIONS.ARTISTS).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        { returnDocument: 'after' }
      );
      if (!result) return undefined;
      return toSchemaType<Artist>(result);
    } catch {
      return undefined;
    }
  }

  // ==================== Artworks ====================
  async getArtwork(id: string): Promise<Artwork | undefined> {
    if (isDummyMode) return undefined;
    try {
      const artwork = await db.collection(COLLECTIONS.ARTWORKS).findOne({
        _id: new ObjectId(id)
      });
      if (!artwork) return undefined;
      return toSchemaType<Artwork>(artwork);
    } catch {
      return undefined;
    }
  }

  async getArtworksByArtistId(artistId: string): Promise<Artwork[]> {
    if (isDummyMode) return [];
    const artworks = await db.collection(COLLECTIONS.ARTWORKS)
      .find({ artistId })
      .sort({ createdAt: -1 })
      .toArray();
    return artworks.map((a: any) => toSchemaType<Artwork>(a));
  }

  async getAllArtworks(): Promise<Artwork[]> {
    if (isDummyMode) return [];
    const artworks = await db.collection(COLLECTIONS.ARTWORKS)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return artworks.map((a: any) => toSchemaType<Artwork>(a));
  }

  async getPublicArtworks(): Promise<Artwork[]> {
    if (isDummyMode) return [];
    const artworks = await db.collection(COLLECTIONS.ARTWORKS)
      .find({ isPublic: true })
      .sort({ createdAt: -1 })
      .toArray();
    return artworks.map((a: any) => toSchemaType<Artwork>(a));
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    if (isDummyMode) {
      return {
        id: new ObjectId().toString(),
        ...insertArtwork,
        createdAt: new Date().toISOString(),
      } as Artwork;
    }
    const result = await db.collection(COLLECTIONS.ARTWORKS).insertOne({
      ...insertArtwork,
      createdAt: new Date(),
    });
    const artwork = await db.collection(COLLECTIONS.ARTWORKS).findOne({
      _id: result.insertedId
    });
    if (!artwork) throw new Error('Failed to create artwork');
    return toSchemaType<Artwork>(artwork);
  }

  async updateArtwork(id: string, update: Partial<InsertArtwork>): Promise<Artwork | undefined> {
    if (isDummyMode) return undefined;
    try {
      const result = await db.collection(COLLECTIONS.ARTWORKS).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        { returnDocument: 'after' }
      );
      if (!result) return undefined;
      return toSchemaType<Artwork>(result);
    } catch {
      return undefined;
    }
  }

  async deleteArtwork(id: string): Promise<boolean> {
    if (isDummyMode) return false;
    try {
      const result = await db.collection(COLLECTIONS.ARTWORKS).deleteOne({
        _id: new ObjectId(id)
      });
      return result.deletedCount > 0;
    } catch {
      return false;
    }
  }

  // ==================== Generated Variations ====================
  async getVariationsByArtworkId(artworkId: string): Promise<GeneratedVariation[]> {
    if (isDummyMode) return [];
    const variations = await db.collection(COLLECTIONS.GENERATED_VARIATIONS)
      .find({ artworkId })
      .sort({ createdAt: -1 })
      .toArray();
    return variations.map((v: any) => toSchemaType<GeneratedVariation>(v));
  }

  async createVariation(insertVariation: InsertGeneratedVariation): Promise<GeneratedVariation> {
    if (isDummyMode) {
      return {
        id: new ObjectId().toString(),
        ...insertVariation,
        createdAt: new Date().toISOString(),
      } as GeneratedVariation;
    }
    const result = await db.collection(COLLECTIONS.GENERATED_VARIATIONS).insertOne({
      ...insertVariation,
      createdAt: new Date(),
    });
    const variation = await db.collection(COLLECTIONS.GENERATED_VARIATIONS).findOne({
      _id: result.insertedId
    });
    if (!variation) throw new Error('Failed to create variation');
    return toSchemaType<GeneratedVariation>(variation);
  }

  // ==================== Artwork Comments ====================
  async getCommentsByArtworkId(artworkId: string): Promise<ArtworkComment[]> {
    if (isDummyMode) return [];
    const comments = await db.collection(COLLECTIONS.ARTWORK_COMMENTS)
      .find({ artworkId })
      .sort({ createdAt: -1 })
      .toArray();
    return comments.map((c: any) => toSchemaType<ArtworkComment>(c));
  }

  async createComment(insertComment: InsertArtworkComment): Promise<ArtworkComment> {
    if (isDummyMode) {
      return {
        id: new ObjectId().toString(),
        ...insertComment,
        createdAt: new Date().toISOString(),
      } as ArtworkComment;
    }
    const result = await db.collection(COLLECTIONS.ARTWORK_COMMENTS).insertOne({
      ...insertComment,
      createdAt: new Date(),
    });
    const comment = await db.collection(COLLECTIONS.ARTWORK_COMMENTS).findOne({
      _id: result.insertedId
    });
    if (!comment) throw new Error('Failed to create comment');
    return toSchemaType<ArtworkComment>(comment);
  }
}

export const storage = new DatabaseStorage();