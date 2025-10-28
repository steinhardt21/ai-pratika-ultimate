import { z } from "zod"

export const workflowSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(256, "Title must be 256 characters or less"),
    description: z.string().min(1, "Description is required"),
    difficulty: z.enum(["Facile", "Medio", "Difficile"], {
      message: 'Difficulty must be "Facile", "Medio", or "Difficile"',
    }),
    timing: z.string().min(1, "Timing is required"),
    pay: z.enum(["free", "freemium", "paid"], {
      message: 'Pay must be "free", "freemium", or "paid"',
    }),
    personas: z.string().min(1, "Personas is required"),
    tools: z.string().min(1, "Tools is required"),
    cover_link: z.string().url("Cover link must be a valid URL").optional(),
    step1_title: z.string().min(1, "At least step1_title is required"),
    step1_text: z.string().min(1, "At least step1_text is required"),
    step1_image: z.string().url("Step image must be a valid URL").optional(),
  })
  .catchall(z.string()) // Allow additional step and FAQ fields

export type WorkflowSchema = z.infer<typeof workflowSchema>

export interface WorkflowValidationResult {
  isValid: boolean
  errors: string[]
  data?: WorkflowSchema
  extractedPersonas?: string[]
  extractedTools?: string[]
}

export function validateWorkflow(data: unknown): WorkflowValidationResult {
  const result = workflowSchema.safeParse(data)

  if (!result.success) {
    const errors = result.error.issues.map((err) => `${err.path.join(".")}: ${err.message}`)
    return {
      isValid: false,
      errors,
    }
  }

  // Extract personas and tools for auto-selection
  const extractedPersonas = result.data.personas
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)

  const extractedTools = result.data.tools
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)

  return {
    isValid: true,
    errors: [],
    data: result.data,
    extractedPersonas,
    extractedTools,
  }
}
