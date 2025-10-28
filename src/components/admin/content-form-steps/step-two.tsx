"use client"

import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface StepTwoProps {
  categories: string[]
  setCategories: (categories: string[]) => void
}

const AVAILABLE_CATEGORIES = [
  "Marketing",
  "Sales",
  "Product",
  "Engineering",
  "Design",
  "Customer Success",
  "Operations",
  "Finance",
  "HR",
]

export function StepTwo({ categories, setCategories }: StepTwoProps) {
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
        <Label className="text-sm font-medium">Categories</Label>
        <p className="text-sm text-muted-foreground">Select the categories this content belongs to</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {AVAILABLE_CATEGORIES.map((category) => (
          <div key={category} className="flex items-center gap-3 py-1">
            <Checkbox
              id={category}
              checked={categories.includes(category)}
              onCheckedChange={() => toggleCategory(category)}
            />
            <Label htmlFor={category} className="font-normal cursor-pointer">
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
