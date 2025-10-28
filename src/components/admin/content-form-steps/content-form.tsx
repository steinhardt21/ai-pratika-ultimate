"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { StepOne } from "./step-one"
import { StepTwo } from "./step-two"
import { StepThree } from "./step-three"
import { type ContentType } from "@/app/(admin)/admin/content/page"
import { toast } from "sonner"

function createContent(content: any, jsonData: Record<string, unknown>, categories: string[], status: "draft" | "published" | "archived") {
  return {
    success: true,
    error: null,
  }
}

export function ContentForm() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [contentType, setContentType] = useState<ContentType | null>(null)
  const [jsonData, setJsonData] = useState<Record<string, unknown> | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [status, setStatus] = useState<"draft" | "published" | "archived">("draft")
  const [isValidJson, setIsValidJson] = useState(false)
  const [extractedData, setExtractedData] = useState<{ personas: string[]; tools: string[] }>({
    personas: [],
    tools: [],
  })

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setStep(1)
      setContentType(null)
      setJsonData(null)
      setCategories([])
      setStatus("draft")
      setIsValidJson(false)
      setExtractedData({ personas: [], tools: [] })
    }, 300)
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!contentType || !jsonData) return

    const result = await createContent(contentType, jsonData, categories, status)

    if (result.success) {
      toast.success(  "Content created", {
        position: 'top-center',
        className: 'text-black',
        description: "Your content has been created successfully.",
      })
      handleClose()
      // router.refresh()
    } else {
      toast.error("Error", {
        description: result.error || "Failed to create content",
      })
    }
  }

  const handleValidationChange = (isValid: boolean, data?: { personas: string[]; tools: string[] }) => {
    setIsValidJson(isValid)
    if (data) {
      setExtractedData(data)
    }
  }

  const canProceed = contentType && jsonData && isValidJson

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="h-8 cursor-pointer">
          New Content
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[600px] sm:max-w-[600px] flex flex-col p-0">
        <SheetHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b space-y-3 sm:space-y-4">
          <SheetTitle className="text-base sm:text-lg">Create Content</SheetTitle>
          <div className="flex gap-1.5 sm:gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
          {step === 1 && (
            <StepOne
              contentType={contentType}
              setContentType={setContentType}
              jsonData={jsonData}
              setJsonData={setJsonData}
              onValidationChange={handleValidationChange}
            />
          )}
          {step === 2 && <StepTwo categories={categories} setCategories={setCategories} extractedPersonas={extractedData.personas} extractedTools={extractedData.tools} />}
          {step === 3 && <StepThree status={status} setStatus={setStatus} />}
        </div>


        <SheetFooter className="flex flex-row items-center justify-between border-t px-4 sm:px-6 py-3 sm:py-4">
          <Button variant="ghost" onClick={step === 1 ? handleClose : handleBack} className="h-9 sm:h-10">
            {step === 1 ? "Cancel" : "Back"}
          </Button>

          {step < 3 ? (
            <Button onClick={handleNext} disabled={step === 1 && !canProceed} className="h-9 sm:h-10">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!canProceed} className="h-9 sm:h-10">
              Create
            </Button>
          )}

        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
