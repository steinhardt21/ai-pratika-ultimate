"use client"

import { Workflow, FileText } from "lucide-react"
import type { ContentType } from "@/app/(admin)/admin/content/page"

interface ContentTypeSelectorProps {
  onSelect: (type: ContentType) => void
}

export function ContentTypeSelector({ onSelect }: ContentTypeSelectorProps) {
  return (
    <div className="grid gap-3">
      <button
        onClick={() => onSelect("workflow")}
        className="border-border hover:border-foreground/20 hover:bg-accent group flex items-start gap-4 rounded-lg border p-4 text-left transition-colors"
      >
        <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-md">
          <Workflow className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 font-medium">Workflow</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Create a workflow with steps, actions, and automation logic
          </p>
        </div>
      </button>
      <button
        onClick={() => onSelect("resource")}
        className="border-border hover:border-foreground/20 hover:bg-accent group flex items-start gap-4 rounded-lg border p-4 text-left transition-colors"
      >
        <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-md">
          <FileText className="size-5" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 font-medium">Resource</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Add a resource like documentation, guides, or reference materials
          </p>
        </div>
      </button>
    </div>
  )
}
