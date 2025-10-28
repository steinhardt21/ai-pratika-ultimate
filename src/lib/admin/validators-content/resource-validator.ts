import { z } from "zod"

export const resourceSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(256, "Title must be 256 characters or less"),
    url: z.string().url("URL must be a valid URL"),
    description: z.string().min(1, "Description is required"),
    personas: z.string().min(1, "Personas is required"),
    tools: z.string().min(1, "Tools is required"),
  })
  .catchall(z.string()) // Allow additional FAQ fields

export type ResourceSchema = z.infer<typeof resourceSchema>

export interface ResourceValidationResult {
  isValid: boolean
  errors: string[]
  data?: ResourceSchema
  extractedPersonas?: string[]
  extractedTools?: string[]
}

export function validateResource(data: unknown): ResourceValidationResult {
  const result = resourceSchema.safeParse(data)

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
