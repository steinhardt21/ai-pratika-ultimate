"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface EditableCellProps {
  id: number
  field: "target" | "limit"
  value: string
  header: string
}

export function EditableCell({ id, field, value, header }: EditableCellProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
          loading: `Saving ${header}`,
          success: "Done",
          error: "Error",
        })
      }}
    >
      <Label htmlFor={`${id}-${field}`} className="sr-only">
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </Label>
      <Input
        className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
        defaultValue={value}
        id={`${id}-${field}`}
      />
    </form>
  )
}
