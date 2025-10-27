"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ContentTypeSelector } from "@/components/admin/content-type-selector"
// import { JsonEditor } from "@/components/json-editor"
import type { ContentType } from "@/app/(admin)/admin/content/page"

export function NewContentButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<ContentType | null>(null)

  const handleSuccess = () => {
    setIsDialogOpen(false)
    setSelectedType(null)
  }

  const handleCancel = () => {
    setSelectedType(null)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="size-4" />
          New Content
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
          <DialogDescription>
            {selectedType ? `Paste your JSON data for the ${selectedType}` : "Select a content type to get started"}
          </DialogDescription>
        </DialogHeader>
        {!selectedType ? (
          <ContentTypeSelector onSelect={setSelectedType} />
        ) : (
        //   <JsonEditor type={selectedType} onSuccess={handleSuccess} onCancel={handleCancel} />
        <div>
          <h1>JsonEditor</h1>
        </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
