import { Badge } from "@/components/ui/badge"
import { Circle, CircleX } from 'lucide-react'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {

  return (
    <Badge variant="outline" className="text-black px-1.5">
      {getStatusIcon(status)} 
      {status}
    </Badge>
  )
}

function getStatusIcon(status: string) {
  switch (status) {
    case "active":
      return <Circle className="fill-green-700 dark:fill-green-400 animate-pulse" />
    case "draft":
      return <Circle className="fill-yellow-500 dark:fill-yellow-400" />
    case "archived":
      return <CircleX className="fill-red-500 dark:fill-red-400" />
  }
}
