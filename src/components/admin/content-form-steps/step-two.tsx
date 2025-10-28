"use client"

import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
interface StepTwoProps {
  categories: string[]
  setCategories: (categories: string[]) => void
  extractedPersonas?: string[]
  extractedTools?: string[]
}

const AVAILABLE_PERSONAS = [
  "Marketer",
  "Manager",
  "Developer",
  "Designer",
  "Creativo",
  "Consulente",
  "Freelancer",
  "Venditore",
  "Product Manager",
  "Data Analyst",
]

const AVAILABLE_TOOLS = [
  "ChatGPT",
  "GPT-4",
  "Claude",
  "Midjourney",
  "DALL-E",
  "Canva",
  "Notion",
  "Google Gemini",
  "Perplexity",
  "OpenAI API",
]

export function StepTwo({ categories, setCategories, extractedPersonas = [], extractedTools = [] }: StepTwoProps) {
  useEffect(() => {
    const autoSelected: string[] = []

    // Match extracted personas with available personas
    extractedPersonas.forEach((persona) => {
      const match = AVAILABLE_PERSONAS.find((p) => p.toLowerCase() === persona.toLowerCase())
      if (match && !autoSelected.includes(match)) {
        autoSelected.push(match)
      }
    })

    // Match extracted tools with available tools
    extractedTools.forEach((tool) => {
      const match = AVAILABLE_TOOLS.find((t) => t.toLowerCase() === tool.toLowerCase())
      if (match && !autoSelected.includes(match)) {
        autoSelected.push(match)
      }
    })

    if (autoSelected.length > 0) {
      setCategories(autoSelected)
    }
  }, [extractedPersonas, extractedTools])

  const toggleCategory = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category))
    } else {
      setCategories([...categories, category])
    }
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Personas</Label>
        <p className="text-sm text-muted-foreground">Select the target professions for this content</p>
        {extractedPersonas.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {extractedPersonas.map((persona) => (
              <Badge key={persona} variant="secondary" className="text-xs">
                {persona}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {AVAILABLE_PERSONAS.map((persona) => (
          <div key={persona} className="flex items-center gap-3 py-1">
            <Checkbox
              id={`persona-${persona}`}
              checked={categories.includes(persona)}
              onCheckedChange={() => toggleCategory(persona)}
            />
            <Label htmlFor={`persona-${persona}`} className="font-normal cursor-pointer">
              {persona}
            </Label>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t">
        <Label className="text-sm font-medium">AI Tools</Label>
        <p className="text-sm text-muted-foreground">Select the AI tools used or discussed in this content</p>
        {extractedTools.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {extractedTools.map((tool) => (
              <Badge key={tool} variant="secondary" className="text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {AVAILABLE_TOOLS.map((tool) => (
          <div key={tool} className="flex items-center gap-3 py-1">
            <Checkbox
              id={`tool-${tool}`}
              checked={categories.includes(tool)}
              onCheckedChange={() => toggleCategory(tool)}
            />
            <Label htmlFor={`tool-${tool}`} className="font-normal cursor-pointer">
              {tool}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
