import { z } from "zod"
import { validateResource } from "./validators-content/resource-validator"
import { validateWorkflow } from "./validators-content/workflow-validator"
import type { ContentType } from "@/app/(admin)/admin/content/page"

// Zod schema for JSON validation
export const jsonSchema = z.string().transform((str, ctx) => {
  try {
    return JSON.parse(str)
  } catch (e) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`,
    })
    return z.NEVER
  }
})

// Validate JSON data based on content type
export function validateJsonData(
  data: Record<string, unknown>, 
  type: ContentType
): {
  isValid: boolean
  errors: string[]
  extractedPersonas?: string[]
  extractedTools?: string[]
} {
  if (type === "resource") {
    return validateResource(data)
  } else if (type === "workflow") {
    return validateWorkflow(data)
  }
  
  return {
    isValid: false,
    errors: ["Unknown content type"],
  }
}

// Parse and validate JSON string
export function parseAndValidateJson(value: string): {
  success: boolean
  data?: Record<string, unknown>
  error?: string
} {
  if (!value.trim()) {
    return { success: false, error: "Empty input" }
  }

  const result = jsonSchema.safeParse(value)
  
  if (!result.success) {
    return { 
      success: false, 
      error: "Invalid JSON format" 
    }
  }

  return { 
    success: true, 
    data: result.data 
  }
}
