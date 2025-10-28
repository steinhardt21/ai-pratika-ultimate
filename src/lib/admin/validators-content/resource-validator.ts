export interface ResourceSchema {
  title: string
  url: string
  description: string
  personas: string
  tools: string
  [key: `faq${number}_question`]: string
  [key: `faq${number}_answer`]: string
}

export interface ResourceValidationResult {
  isValid: boolean
  errors: string[]
  data?: ResourceSchema
  extractedPersonas?: string[]
  extractedTools?: string[]
}

export function validateResource(data: Record<string, unknown>): ResourceValidationResult {
  const errors: string[] = []

  // Required fields validation
  if (!data.title || typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.push("Title is required")
  } else if (data.title.length > 256) {
    errors.push("Title must be 256 characters or less")
  }

  if (!data.url || typeof data.url !== "string") {
    errors.push("URL is required")
  } else {
    try {
      new URL(data.url)
    } catch {
      errors.push("URL must be a valid URL")
    }
  }

  if (!data.description || typeof data.description !== "string" || data.description.trim().length === 0) {
    errors.push("Description is required")
  }

  if (!data.personas || typeof data.personas !== "string" || data.personas.trim().length === 0) {
    errors.push("Personas is required")
  }

  if (!data.tools || typeof data.tools !== "string" || data.tools.trim().length === 0) {
    errors.push("Tools is required")
  }

  // FAQ validation (at least one FAQ pair is recommended but not required)
  const faqKeys = Object.keys(data).filter((key) => key.startsWith("faq") && key.endsWith("_question"))
  for (const questionKey of faqKeys) {
    const answerKey = questionKey.replace("_question", "_answer")
    if (!data[answerKey]) {
      errors.push(`Missing answer for ${questionKey}`)
    }
  }

  // Extract personas and tools for auto-selection
  const extractedPersonas = data.personas
    ? String(data.personas)
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
    : []

  const extractedTools = data.tools
    ? String(data.tools)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  return {
    isValid: errors.length === 0,
    errors,
    data: errors.length === 0 ? (data as unknown as ResourceSchema) : undefined,
    extractedPersonas,
    extractedTools, 
  }
}
