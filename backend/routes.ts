import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertPromptSchema,
  insertVariableSchema,
  insertArtistSchema,
  insertArtworkSchema,
} from "@shared/schema";
import { generateImage } from "./gemini";

// Import generation routes and worker
import generationsRouter from "./routes/generations.js";
import { startGenerationWorker } from "./workers/generation-worker.js";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/prompts", async (req, res) => {
    try {
      const prompts = await storage.getAllPrompts();
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompts" });
    }
  });

  app.get("/api/prompts/by-slug/:slug", async (req, res) => {
    try {
      const prompt = await storage.getPromptBySlug(req.params.slug);
      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }
      res.json(prompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompt" });
    }
  });

  app.get("/api/prompts/:id", async (req, res) => {
    try {
      const prompt = await storage.getPrompt(req.params.id);
      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }
      res.json(prompt);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch prompt" });
    }
  });

  app.get("/api/prompts/:id/content", async (req, res) => {
    try {
      const promptWithContent = await storage.getPromptWithDecryptedContent(
        req.params.id,
      );
      if (!promptWithContent) {
        return res.status(404).json({ error: "Prompt not found" });
      }
      res.json({ content: promptWithContent.decryptedContent });
    } catch (error) {
      console.error("Decrypt prompt error:", error);
      res.status(500).json({ error: "Failed to decrypt prompt content" });
    }
  });

  app.post("/api/prompts", async (req, res) => {
    try {
      const { content, encryptedContent, iv, authTag, ...rest } = req.body;
      if (!content || typeof content !== "string") {
        return res.status(400).json({ error: "Content is required" });
      }
      if (!rest.title || typeof rest.title !== "string") {
        return res.status(400).json({ error: "Title is required" });
      }
      const prompt = await storage.createPrompt({ content, ...rest });
      res.status(201).json(prompt);
    } catch (error) {
      console.error("Create prompt error:", error);
      res.status(400).json({ error: "Invalid prompt data" });
    }
  });

  app.patch("/api/prompts/:id", async (req, res) => {
    try {
      const { encryptedContent, iv, authTag, ...safeBody } = req.body;
      const prompt = await storage.updatePrompt(req.params.id, safeBody);
      if (!prompt) {
        return res.status(404).json({ error: "Prompt not found" });
      }
      res.json(prompt);
    } catch (error) {
      console.error("Update prompt error:", error);
      res.status(500).json({ error: "Failed to update prompt" });
    }
  });

  app.delete("/api/prompts/:id", async (req, res) => {
    try {
      await storage.deleteVariablesByPromptId(req.params.id);
      const deleted = await storage.deletePrompt(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Prompt not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete prompt" });
    }
  });

  app.get("/api/prompts/:promptId/variables", async (req, res) => {
    try {
      const variables = await storage.getVariablesByPromptId(
        req.params.promptId,
      );
      res.json(variables);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch variables" });
    }
  });

  app.post("/api/variables", async (req, res) => {
    try {
      const validatedData = insertVariableSchema.parse(req.body);
      const variable = await storage.createVariable(validatedData);
      res.status(201).json(variable);
    } catch (error) {
      res.status(400).json({ error: "Invalid variable data" });
    }
  });

  app.patch("/api/variables/:id", async (req, res) => {
    try {
      const variable = await storage.updateVariable(req.params.id, req.body);
      if (!variable) {
        return res.status(404).json({ error: "Variable not found" });
      }
      res.json(variable);
    } catch (error) {
      res.status(500).json({ error: "Failed to update variable" });
    }
  });

  app.delete("/api/variables/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteVariable(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Variable not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete variable" });
    }
  });

  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const imageDataUrl = await generateImage(prompt);
      res.json({ imageUrl: imageDataUrl });
    } catch (error: any) {
      console.error("Image generation error:", error);
      res
        .status(500)
        .json({ error: error.message || "Failed to generate image" });
    }
  });

  // Artist routes
  app.get("/api/artists", async (req, res) => {
    try {
      const artists = await storage.getAllArtists();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artists" });
    }
  });

  app.get("/api/artists/:id", async (req, res) => {
    try {
      const artist = await storage.getArtist(req.params.id);
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
      res.json(artist);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artist" });
    }
  });

  app.get("/api/artists/username/:username", async (req, res) => {
    try {
      const artist = await storage.getArtistByUsername(req.params.username);
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
      res.json(artist);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artist" });
    }
  });

  app.post("/api/artists", async (req, res) => {
    try {
      const validatedData = insertArtistSchema.parse(req.body);
      const artist = await storage.createArtist(validatedData);
      res.status(201).json(artist);
    } catch (error) {
      res.status(400).json({ error: "Invalid artist data" });
    }
  });

  app.patch("/api/artists/:id", async (req, res) => {
    try {
      const artist = await storage.updateArtist(req.params.id, req.body);
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
      res.json(artist);
    } catch (error) {
      res.status(500).json({ error: "Failed to update artist" });
    }
  });

  // Artwork routes
  app.get("/api/artworks", async (req, res) => {
    try {
      const artworks = await storage.getPublicArtworks();
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artworks" });
    }
  });

  app.get("/api/artworks/:id", async (req, res) => {
    try {
      const artwork = await storage.getArtwork(req.params.id);
      if (!artwork) {
        return res.status(404).json({ error: "Artwork not found" });
      }
      res.json(artwork);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artwork" });
    }
  });

  app.get("/api/artists/:artistId/artworks", async (req, res) => {
    try {
      const artworks = await storage.getArtworksByArtistId(req.params.artistId);
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artworks" });
    }
  });

  app.post("/api/artworks", async (req, res) => {
    try {
      const validatedData = insertArtworkSchema.parse(req.body);
      const artwork = await storage.createArtwork(validatedData);
      res.status(201).json(artwork);
    } catch (error) {
      res.status(400).json({ error: "Invalid artwork data" });
    }
  });

  app.patch("/api/artworks/:id", async (req, res) => {
    try {
      const artwork = await storage.updateArtwork(req.params.id, req.body);
      if (!artwork) {
        return res.status(404).json({ error: "Artwork not found" });
      }
      res.json(artwork);
    } catch (error) {
      res.status(500).json({ error: "Failed to update artwork" });
    }
  });

  app.delete("/api/artworks/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteArtwork(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Artwork not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete artwork" });
    }
  });


  // Load image document with variable values and variable definitions for UI.
  // Frontend uses variableDefinitions[].type to render: multi-select → checkboxes, single-select/grouped/radio → radio buttons.
  app.get("/api/images/:id", async (req, res) => {
    try {
      const image = await storage.getGeneratedImage(req.params.id);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }
      const variableDefinitions = await storage.getVariablesByPromptId(image.promptId);
      const comments = await storage.getCommentsByImageId(req.params.id);
      // Do not expose encrypted prompt; only what the UI needs.
      const { encryptedPrompt, encryptedPromptIv, encryptedPromptAuthTag, ...safeImage } = image;
      const definitions = variableDefinitions
        .map((v) => ({
          id: v.id,
          name: v.name,
          label: v.label,
          type: v.type,
          options: v.options,
          position: v.position,
          required: v.required,
          defaultValue: v.defaultValue,
          min: v.min,
          max: v.max,
          step: v.step,
          placeholder: v.placeholder,
        }))
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      res.json({
        image: {
          ...safeImage,
          createdAt: (safeImage as any).createdAt,
        },
        variableValues: image.variableValues ?? [],
        variableDefinitions: definitions,
        comments,
      });
    } catch (error) {
      console.error("Get image error:", error);
      res.status(500).json({ error: "Failed to fetch image" });
    }
  });

  app.get("/api/images/:id/comments", async (req, res) => {
    try {
      const comments = await storage.getCommentsByImageId(req.params.id);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  // Display all prompts listed for sale (price > 0)
  app.get("/api/marketplace/prompts", async (req, res) => {
    try {
      const prompts = await storage.getMarketplacePrompts();
      // Remove encrypted content from response for security
      const safePrompts = prompts.map((p) => {
        const { encryptedContent, iv, authTag, ...safe } = p;
        return safe;
      });
      res.json({ prompts: safePrompts, total: safePrompts.length });
    } catch (error) {
      console.error("Marketplace prompts error:", error);
      res.status(500).json({ error: "Failed to fetch marketplace prompts" });
    }
  });

  // Display all images published to showroom
  app.get("/api/gallery/showroom", async (req, res) => {
    try {
      const images = await storage.getShowroomImages();
      // Remove encrypted prompt fields from response
      const safeImages = images.map((img) => {
        const { encryptedPrompt, encryptedPromptIv, encryptedPromptAuthTag, ...safe } = img;
        return safe;
      });
      res.json({ images: safeImages, total: safeImages.length });
    } catch (error) {
      console.error("Showroom images error:", error);
      res.status(500).json({ error: "Failed to fetch showroom images" });
    }
  });

  // Display all images created by a specific user
  app.get("/api/users/:userId/gallery", async (req, res) => {
    try {
      const { userId } = req.params;
      const images = await storage.getGeneratedImagesByUserId(userId);
      // Remove encrypted prompt fields from response
      const safeImages = images.map((img) => {
        const { encryptedPrompt, encryptedPromptIv, encryptedPromptAuthTag, ...safe } = img;
        return safe;
      });
      res.json({ images: safeImages, total: safeImages.length });
    } catch (error) {
      console.error("User gallery error:", error);
      res.status(500).json({ error: "Failed to fetch user gallery" });
    }
  });

  // Register generation routes
  app.use("/api", generationsRouter);

  // Start background generation worker
  if (process.env.START_GENERATION_WORKER !== "false") {
    startGenerationWorker();
  }

  const httpServer = createServer(app);

  return httpServer;
}
