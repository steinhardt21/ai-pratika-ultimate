"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import type { ContentType } from "@/app/(admin)/admin/content/page"
import { validateResource } from "@/lib/admin/validators-content/resource-validator"
import { validateWorkflow } from "@/lib/admin/validators-content/workflow-validator"
import { Alert, AlertDescription } from "@/components/ui/alert"
interface StepOneProps {
  contentType: ContentType | null
  setContentType: (type: ContentType) => void
  jsonData: Record<string, unknown> | null
  setJsonData: (data: Record<string, unknown> | null) => void
  onValidationChange?: (isValid: boolean, extractedData?: { personas: string[]; tools: string[] }) => void
}

export function StepOne({ contentType, setContentType, jsonData, setJsonData, onValidationChange }: StepOneProps) {
  const [jsonText, setJsonText] = useState("")
  const [parseError, setParseError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleJsonChange = (value: string) => {
    setJsonText(value)

    if (!value.trim()) {
      setJsonData(null)
      setParseError(null)
      setValidationErrors([])
      onValidationChange?.(false)
      return
    }

    try {
      const parsed = JSON.parse(value)
      setJsonData(parsed)
      setParseError(null)

      if (contentType) {
        validateJsonData(parsed, contentType)
      }
    } catch (e) {
      setJsonData(null)
      setParseError("Invalid JSON format")
      setValidationErrors([])
      onValidationChange?.(false)
    }
  }

  const validateJsonData = (data: Record<string, unknown>, type: ContentType) => {
    if (type === "resource") {
      const result = validateResource(data)
      setValidationErrors(result.errors)
      onValidationChange?.(result.isValid, {
        personas: result.extractedPersonas || [],
        tools: result.extractedTools || [],
      })
    } else if (type === "workflow") {
      const result = validateWorkflow(data)
      setValidationErrors(result.errors)
      onValidationChange?.(result.isValid, {
        personas: result.extractedPersonas || [],
        tools: result.extractedTools || [],
      })
    }
  }

  useEffect(() => {
    if (jsonData && contentType) {
      validateJsonData(jsonData, contentType)
    }
  }, [contentType])

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

        {parseError && (
          <Alert variant="destructive">
            <AlertDescription>{parseError}</AlertDescription>
          </Alert>
        )}

        {!parseError && validationErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertDescription>
              <div className="space-y-1">
                <p className="font-medium">Validation errors:</p>
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, i) => (
                    <li key={i} className="text-sm">
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {jsonData && !parseError && validationErrors.length === 0 && contentType && (
          <p className="text-sm text-green-600">✓ Valid {contentType} JSON</p>
        )}


        <Textarea
          id="json"
          placeholder='{"title": "Example", "description": "..."}'
          value={jsonText}
          onChange={(e) => handleJsonChange(e.target.value)}
          className="min-h-[240px] sm:min-h-[320px] font-mono text-sm resize-none"
        />

       
      </div>
    </div>
  )
}