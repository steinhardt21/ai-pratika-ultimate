"use client"

import { useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Doc } from "../../../../convex/_generated/dataModel"

interface StepTwoProps {
  categories: string[]
  setCategories: (categories: string[]) => void
  extractedPersonas?: string[]
  extractedTools?: string[]
  professions?: Doc<"profession">[]
}

// Fallback personas if Convex data is not available
const FALLBACK_PERSONAS = [
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

export function StepTwo({ categories, setCategories, extractedPersonas = [], extractedTools = [], professions }: StepTwoProps) {
  // Check if professions are still loading
  const isLoadingProfessions = professions === undefined
  
  // Use Convex professions if available, otherwise fallback to hardcoded list
  const availablePersonas = professions && professions.length > 0 
    ? professions
        .filter(p => p.status === "active" && p.name) // Only active professions with names
        .sort((a, b) => (a.name || "").localeCompare(b.name || "")) // Sort alphabetically
    : FALLBACK_PERSONAS.map(name => ({ _id: name, name })) // Convert fallback to objects
  useEffect(() => {
    const autoSelected: string[] = []

    // Match extracted personas with available personas
    extractedPersonas.forEach((persona) => {
      const match = availablePersonas.find((p) => p.name?.toLowerCase() === persona.toLowerCase())
      if (match && !autoSelected.includes(match._id)) {
        autoSelected.push(match._id)
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
  }, [extractedPersonas, extractedTools, setCategories])

  const toggleCategory = (categoryId: string) => {
    if (categories.includes(categoryId)) {
      setCategories(categories.filter((c) => c !== categoryId))
    } else {
      setCategories([...categories, categoryId])
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
        {isLoadingProfessions ? (
          // Show loading skeletons while professions are loading
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3 py-1">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))
        ) : (
          availablePersonas.map((persona) => (
            <div key={persona._id} className="flex items-center gap-3 py-1">
              <Checkbox
                id={`persona-${persona._id}`}
                checked={categories.includes(persona._id)}
                onCheckedChange={() => toggleCategory(persona._id)}
              />
              <Label htmlFor={`persona-${persona._id}`} className="font-normal cursor-pointer">
                {persona.name}
              </Label>
            </div>
          ))
        )}
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
