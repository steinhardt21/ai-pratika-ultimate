export interface WorkflowSchema {
  title: string
  description: string
  difficulty: "Facile" | "Medio" | "Difficile"
  timing: string
  pay: "free" | "freemium" | "paid"
  personas: string
  tools: string
  cover_link?: string
  [key: `step${number}_title`]: string
  [key: `step${number}_text`]: string
  [key: `step${number}_image`]: string
  [key: `faq${number}_question`]: string
  [key: `faq${number}_answer`]: string
}

export interface WorkflowValidationResult {
  isValid: boolean
  errors: string[]
  data?: WorkflowSchema
  extractedPersonas?: string[]
  extractedTools?: string[]
}

export function validateWorkflow(data: Record<string, unknown>): WorkflowValidationResult {
  const errors: string[] = []

  // Required fields validation
  if (!data.title || typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.push("Title is required")
  } else if (data.title.length > 256) {
    errors.push("Title must be 256 characters or less")
  }

  if (!data.description || typeof data.description !== "string" || data.description.trim().length === 0) {
    errors.push("Description is required")
  }

  if (!data.difficulty || !["Facile", "Medio", "Difficile"].includes(String(data.difficulty))) {
    errors.push('Difficulty must be "Facile", "Medio", or "Difficile"')
  }

  if (!data.timing || typeof data.timing !== "string" || data.timing.trim().length === 0) {
    errors.push("Timing is required")
  }

  if (!data.pay || !["free", "freemium", "paid"].includes(String(data.pay))) {
    errors.push('Pay must be "free", "freemium", or "paid"')
  }

  if (!data.personas || typeof data.personas !== "string" || data.personas.trim().length === 0) {
    errors.push("Personas is required")
  }

  if (!data.tools || typeof data.tools !== "string" || data.tools.trim().length === 0) {
    errors.push("Tools is required")
  }

  // Validate at least one step exists
  if (!data.step1_title || !data.step1_text) {
    errors.push("At least one step (step1_title and step1_text) is required")
  }

  // Validate cover_link if provided
  if (data.cover_link && typeof data.cover_link === "string") {
    try {
      new URL(data.cover_link)
    } catch {
      errors.push("cover_link must be a valid URL")
    }
  }

  // Validate step images if provided
  const stepImageKeys = Object.keys(data).filter((key) => key.match(/^step\d+_image$/))
  for (const imageKey of stepImageKeys) {
    const imageUrl = data[imageKey]
    if (imageUrl && typeof imageUrl === "string") {
      try {
        new URL(imageUrl)
      } catch {
        errors.push(`${imageKey} must be a valid URL`)
      }
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
    data: errors.length === 0 ? (data as unknown as WorkflowSchema) : undefined,
    extractedPersonas,
    extractedTools,
  }
}
