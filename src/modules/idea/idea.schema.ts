import { z } from "zod";

export const ideaSourceSchema = z.enum([
  "thought",
  "research",
  "reference",
  "comment",
  "book",
  "experience",
  "audience_question",
  "learning",
  "other",
]);

export const ideaStatusSchema = z.enum([
  "inbox",
  "selected",
  "rejected",
  "converted",
  "archived",
]);

const uuidSchema = z.uuid();

export const createIdeaSchema = z.object({
  project_id: uuidSchema,

  topic_id: uuidSchema.nullable().optional(),
  reference_id: uuidSchema.nullable().optional(),

  title: z.string().trim().min(1).max(255),
  problem: z.string().trim().nullable().optional(),
  angle: z.string().trim().nullable().optional(),
  core_idea: z.string().trim().nullable().optional(),

  source: ideaSourceSchema.optional().default("thought"),
  status: ideaStatusSchema.optional().default("inbox"),

  priority: z.number().int().min(1).max(5).default(3),
  notes: z.string().trim().nullable().optional(),
});

type CreateIdeaDTO = z.infer<typeof createIdeaSchema>;

export type { CreateIdeaDTO };
