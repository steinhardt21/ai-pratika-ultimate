import type { ContentType } from "@/app/(admin)/admin/content/page"



const AI_TOOLS = [
  "ChatGPT", "GPT-4", "Claude", "Midjourney", "DALL-E", 
  "Canva", "Notion", "Google Gemini", "Perplexity", "OpenAI API"
]


/**
 * Maps selected categories to target professions and AI instruments
 * Categories now contain profession IDs and tool names
 */
function mapCategoriesToTargets(categories: string[]) {
  const targetProfessions: string[] = []
  const targetAiInstruments: string[] = []
  
  // Separate profession IDs from tool names
  categories.forEach(category => {
    // Check if it's a tool name (from AI_TOOLS)
    if (AI_TOOLS.includes(category)) {
      targetAiInstruments.push(category)
    } else {
      // Assume it's a profession ID
      targetProfessions.push(category)
    }
  })
  
  return { targetProfessions, targetAiInstruments }
}

/**
 * Extracts FAQs from JSON data
 */
function extractFAQs(jsonData: Record<string, unknown>) {
  return Object.entries(jsonData)
    .filter(([key]) => key.startsWith("faq") && key.includes("question"))
    .map((_, index) => ({
      question: jsonData[`faq${index + 1}_question`] as string,
      answer: jsonData[`faq${index + 1}_answer`] as string,
    }))
    .filter(faq => faq.question && faq.answer)
}

/**
 * Extracts workflow steps from JSON data
 */
function extractWorkflowSteps(jsonData: Record<string, unknown>) {
  return Object.entries(jsonData)
    .filter(([key]) => key.startsWith("step") && key.includes("title"))
    .map((_, index) => {
      const stepNum = index + 1
      return {
        title: jsonData[`step${stepNum}_title`] as string,
        text: jsonData[`step${stepNum}_text`] as string,
        image: jsonData[`step${stepNum}_image`] as string || undefined,
      }
    })
    .filter(step => step.title && step.text)
}

/**
 * Creates FormData for resource article submission
 */
export function createResourceFormData(
  jsonData: Record<string, unknown>,
  categories: string[]
): FormData {
  const formData = new FormData()
  const { targetProfessions, targetAiInstruments } = mapCategoriesToTargets(categories)
  
  // Basic fields
  formData.append("title", (jsonData.title as string) || "")
  formData.append("description", (jsonData.description as string) || "")
  formData.append("url", (jsonData.url as string) || "")
  
  // Target categories
  formData.append("targetProfessions", JSON.stringify(targetProfessions))
  formData.append("targetAiInstruments", JSON.stringify(targetAiInstruments))
  
  // FAQs
  const faqs = extractFAQs(jsonData)
  if (faqs.length > 0) {
    formData.append("faqs", JSON.stringify(faqs))
  }
  
  return formData
}

/**
 * Creates FormData for workflow article submission
 */
export function createWorkflowFormData(
  jsonData: Record<string, unknown>,
  categories: string[]
): FormData {
  const formData = new FormData()
  const { targetProfessions, targetAiInstruments } = mapCategoriesToTargets(categories)
  
  // Basic fields
  formData.append("title", (jsonData.title as string) || "")
  formData.append("description", (jsonData.description as string) || "")
  formData.append("difficulty", (jsonData.difficulty as string) || "beginner")
  formData.append("timing", (jsonData.timing as string) || "")
  formData.append("pay", (jsonData.pay as string) || "free")
  
  // Optional cover image
  if (jsonData.cover_link) {
    formData.append("imageUrl", jsonData.cover_link as string)
  }
  
  // Target categories
  formData.append("targetProfessions", JSON.stringify(targetProfessions))
  formData.append("targetAiInstruments", JSON.stringify(targetAiInstruments))
  
  // Workflow steps
  const steps = extractWorkflowSteps(jsonData)
  if (steps.length > 0) {
    formData.append("steps", JSON.stringify(steps))
  }
  
  // FAQs
  const faqs = extractFAQs(jsonData)
  if (faqs.length > 0) {
    formData.append("faqs", JSON.stringify(faqs))
  }
  
  return formData
}

/**
 * Main form processor that routes to the appropriate handler
 */
export function processContentForm(
  contentType: ContentType,
  jsonData: Record<string, unknown>,
  categories: string[]
): FormData {
  switch (contentType) {
    case "resource":
      return createResourceFormData(jsonData, categories)
    case "workflow":
      return createWorkflowFormData(jsonData, categories)
    default:
      throw new Error(`Unsupported content type: ${contentType}`)
  }
}
