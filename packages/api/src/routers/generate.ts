import { z } from "zod";
import { router, secureProcedure } from "../server.js";
import { TRPCError } from "@trpc/server";
import {
  userSettings,
  topics,
  flashcards,
  quizzes,
  quizQuestions,
  quizOptions,
  mindMaps,
} from "@blob/db/schema";
import { eq, and } from "drizzle-orm";

// Import AI SDK - NOTE: This requires @blob/ai package to be properly linked
// import { StudyMaterialSDK } from "@blob/ai";

const expertiseLevelSchema = z.enum(["beginner", "intermediate", "advanced"]);

export const generateRouter = router({
  // Generate all study materials for a topic
  studyMaterials: secureProcedure
    .input(
      z.object({
        topicId: z.string().uuid(),
        expertiseLevel: expertiseLevelSchema.default("intermediate"),
        additionalContext: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Verify user owns the topic
      const [topic] = await ctx.db
        .select()
        .from(topics)
        .where(and(eq(topics.id, input.topicId), eq(topics.userId, ctx.userId)))
        .limit(1);

      if (!topic) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Topic not found or you don't have access to it",
        });
      }

      // Get user's AI settings
      const [settings] = await ctx.db
        .select()
        .from(userSettings)
        .where(eq(userSettings.userId, ctx.userId))
        .limit(1);

      if (!settings?.encryptedApiKey) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please configure your AI API key in settings first",
        });
      }

      // TODO: Decrypt the API key
      const apiKey = settings.encryptedApiKey;
      const provider = settings.aiProvider ?? "google";
      const model =
        settings.preferredModel ??
        (provider === "google" ? "gemini-1.5-flash" : "gpt-4o-mini");

      // TODO: Implement actual AI generation
      // const sdk = new StudyMaterialSDK({
      //     provider,
      //     apiKey,
      //     model,
      // });
      //
      // const result = await sdk.generateStudyMaterial({
      //     topic: topic.title,
      //     expertiseLevel: input.expertiseLevel,
      //     additionalContext: input.additionalContext,
      // });

      // For now, return a placeholder indicating the feature needs implementation
      throw new TRPCError({
        code: "NOT_IMPLEMENTED",
        message:
          "AI generation is not yet fully implemented. This is a skeleton endpoint.",
      });
    }),

  // Generate only flashcards
  flashcards: secureProcedure
    .input(
      z.object({
        topicId: z.string().uuid(),
        count: z.number().min(1).max(50).default(10),
        expertiseLevel: expertiseLevelSchema.default("intermediate"),
        additionalContext: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Verify user owns the topic
      const [topic] = await ctx.db
        .select()
        .from(topics)
        .where(and(eq(topics.id, input.topicId), eq(topics.userId, ctx.userId)))
        .limit(1);

      if (!topic) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Topic not found or you don't have access to it",
        });
      }

      // Get user's AI settings
      const [settings] = await ctx.db
        .select()
        .from(userSettings)
        .where(eq(userSettings.userId, ctx.userId))
        .limit(1);

      if (!settings?.encryptedApiKey) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please configure your AI API key in settings first",
        });
      }

      // TODO: Implement actual AI flashcard generation
      // This should:
      // 1. Call the AI SDK to generate flashcards
      // 2. Save them to the database
      // 3. Return the created flashcards

      throw new TRPCError({
        code: "NOT_IMPLEMENTED",
        message:
          "Flashcard generation is not yet fully implemented. This is a skeleton endpoint.",
      });
    }),

  // Generate only quiz
  quiz: secureProcedure
    .input(
      z.object({
        topicId: z.string().uuid(),
        questionCount: z.number().min(1).max(30).default(10),
        expertiseLevel: expertiseLevelSchema.default("intermediate"),
        additionalContext: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Verify user owns the topic
      const [topic] = await ctx.db
        .select()
        .from(topics)
        .where(and(eq(topics.id, input.topicId), eq(topics.userId, ctx.userId)))
        .limit(1);

      if (!topic) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Topic not found or you don't have access to it",
        });
      }

      // Get user's AI settings
      const [settings] = await ctx.db
        .select()
        .from(userSettings)
        .where(eq(userSettings.userId, ctx.userId))
        .limit(1);

      if (!settings?.encryptedApiKey) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please configure your AI API key in settings first",
        });
      }

      // TODO: Implement actual AI quiz generation
      // This should:
      // 1. Call the AI SDK to generate quiz questions
      // 2. Save quiz, questions, and options to the database
      // 3. Return the created quiz

      throw new TRPCError({
        code: "NOT_IMPLEMENTED",
        message:
          "Quiz generation is not yet fully implemented. This is a skeleton endpoint.",
      });
    }),

  // Generate only mind map
  mindMap: secureProcedure
    .input(
      z.object({
        topicId: z.string().uuid(),
        expertiseLevel: expertiseLevelSchema.default("intermediate"),
        additionalContext: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Verify user owns the topic
      const [topic] = await ctx.db
        .select()
        .from(topics)
        .where(and(eq(topics.id, input.topicId), eq(topics.userId, ctx.userId)))
        .limit(1);

      if (!topic) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Topic not found or you don't have access to it",
        });
      }

      // Get user's AI settings
      const [settings] = await ctx.db
        .select()
        .from(userSettings)
        .where(eq(userSettings.userId, ctx.userId))
        .limit(1);

      if (!settings?.encryptedApiKey) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please configure your AI API key in settings first",
        });
      }

      // TODO: Implement actual AI mind map generation
      // This should:
      // 1. Call the AI SDK to generate mind map structure
      // 2. Save it to the database
      // 3. Return the created mind map

      throw new TRPCError({
        code: "NOT_IMPLEMENTED",
        message:
          "Mind map generation is not yet fully implemented. This is a skeleton endpoint.",
      });
    }),
});
