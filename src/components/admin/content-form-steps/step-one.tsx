"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import type { ContentType } from "@/app/(admin)/admin/content/page"

interface StepOneProps {
  contentType: ContentType | null
  setContentType: (type: ContentType) => void
  jsonData: Record<string, unknown> | null
  setJsonData: (data: Record<string, unknown> | null) => void
}

export function StepOne({ contentType, setContentType, jsonData, setJsonData }: StepOneProps) {
  const [jsonText, setJsonText] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleJsonChange = (value: string) => {
    setJsonText(value)

    if (!value.trim()) {
      setJsonData(null)
      setError(null)
      return
    }

    try {
      const parsed = JSON.parse(value)
      setJsonData(parsed)
      setError(null)
    } catch (e) {
      setJsonData(null)
      setError("Invalid JSON format")
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-3 sm:space-y-4">
        <Label className="text-sm font-medium">Content Type</Label>
        <RadioGroup value={contentType || ""} onValueChange={(v) => setContentType(v as ContentType)}>
          <div className="flex items-center gap-3 py-1">
            <RadioGroupItem value="workflow" id="workflow" />
            <Label htmlFor="workflow" className="font-normal cursor-pointer">
              Workflow
            </Label>
          </div>
          <div className="flex items-center gap-3 py-1">
            <RadioGroupItem value="resource" id="resource" />
            <Label htmlFor="resource" className="font-normal cursor-pointer">
              Resource
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <Label htmlFor="json" className="text-sm font-medium">
          JSON Data
        </Label>
        <Textarea
          id="json"
          placeholder='{"title": "Example", "description": "..."}'
          value={jsonText}
          onChange={(e) => handleJsonChange(e.target.value)}
          className="min-h-[240px] sm:min-h-[320px] font-mono text-sm resize-none"
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {jsonData && !error && <p className="text-sm text-muted-foreground">✓ Valid JSON</p>}
      </div>
    </div>
  )
}
