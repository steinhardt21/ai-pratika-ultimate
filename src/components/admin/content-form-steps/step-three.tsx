import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface StepThreeProps {
  status: "draft" | "published" | "archived"
  setStatus: (status: "draft" | "published" | "archived") => void
}

export function StepThree({ status, setStatus }: StepThreeProps) {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Publication Status</Label>
        <p className="text-sm text-muted-foreground">Choose the status for this content</p>
      </div>

      <RadioGroup value={status} onValueChange={(v) => setStatus(v as "draft" | "published" | "archived")}>
        <div className="space-y-2.5 sm:space-y-3">
          <div className="flex items-start gap-3 rounded-lg border p-3 sm:p-4 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="draft" id="draft" className="mt-0.5" />
            <div className="flex-1 space-y-1">
              <Label htmlFor="draft" className="cursor-pointer font-medium text-sm sm:text-base">
                Draft
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">Content is not visible to the public</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-3 sm:p-4 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="published" id="published" className="mt-0.5" />
            <div className="flex-1 space-y-1">
              <Label htmlFor="published" className="cursor-pointer font-medium text-sm sm:text-base">
                Published
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">Content is live and visible to everyone</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-3 sm:p-4 hover:bg-muted/50 transition-colors">
            <RadioGroupItem value="archived" id="archived" className="mt-0.5" />
            <div className="flex-1 space-y-1">
              <Label htmlFor="archived" className="cursor-pointer font-medium text-sm sm:text-base">
                Archived
              </Label>
              <p className="text-xs sm:text-sm text-muted-foreground">Content is hidden but preserved</p>
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}
