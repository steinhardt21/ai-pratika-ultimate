import { Badge } from "@/components/ui/badge"
import { Circle, CircleCheck, CircleX } from 'lucide-react'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {

  return (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
      {getStatusIcon(status)} 
      {status}
    </Badge>
  )
}

function getStatusIcon(status: string) {
  switch (status) {
    case "active":
      return <CircleCheck className="fill-green-500 dark:fill-green-400" />
    case "draft":
      return <Circle className="fill-yellow-500 dark:fill-yellow-400" />
    case "archived":
      return <CircleX className="fill-red-500 dark:fill-red-400" />
  }
}
