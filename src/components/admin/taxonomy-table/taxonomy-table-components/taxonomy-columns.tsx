import { MoreVertical } from 'lucide-react'
import type { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { EditableCell } from "./editable-cell"
import { StatusBadge } from "../../content-table/data-table/status-badge"
import { TableCellViewer } from "../../content-table/data-table/table-cell-viewer"

export const schema = z.object({
  _id: z.string(),
  _creationTime: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.union([z.literal("active"), z.literal("archived")]),
  createdBy: z.string(),
  updatedAt: z.number().optional()
})

export const taxonomyColumns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      return <div className="w-32">{row.original.name}</div>
    },
    enableHiding: false,
  },
  {
    accessorKey: "_creationTime",
    header: "Data creazione",
    cell: ({ row }) => {
      const timestamp = row.original._creationTime;
      
      // Handle invalid or missing timestamps
      if (!timestamp || isNaN(timestamp)) {
        return (
          <div className="w-32 text-muted-foreground">
            <div className="text-sm">-</div>
            <div className="text-xs">-</div>
          </div>
        );
      }
      
      // Convert Convex timestamp (milliseconds) to Date
      const date = new Date(timestamp);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return (
          <div className="w-32 text-muted-foreground">
            <div className="text-sm">Invalid Date</div>
            <div className="text-xs">Invalid Date</div>
          </div>
        );
      }
      
      const day = date.toLocaleDateString('it-IT');
      const time = date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
      
      return (
        <div className="w-32">
          <div className="text-sm">{day}</div>
          <div className="text-xs text-muted-foreground">{time}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "description",
    header: "Descrizione",
    cell: ({ row }) => <div className="w-32">{row.original.description}</div>,
  },
//   {
//     accessorKey: "target",
//     header: () => <div className="w-full text-right">Target</div>,
//     cell: ({ row }) => (
//       <EditableCell id={row.original.id} field="target" value={row.original.target} header={row.original.header} />
//     ),
//   },
//   {
//     accessorKey: "limit",
//     header: () => <div className="w-full text-right">Limit</div>,
//     cell: ({ row }) => (
//       <EditableCell id={row.original.id} field="limit" value={row.original.limit} header={row.original.header} />
//     ),
//   },
//   {
//     accessorKey: "reviewer",
//     header: "Reviewer",
//     cell: ({ row }) => {
//       const isAssigned = row.original.reviewer !== "Assign reviewer"

//       if (isAssigned) {
//         return row.original.reviewer
//       }

//       return (
//         <>
//           <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
//             Reviewer
//           </Label>
//           <Select>
//             <SelectTrigger
//               className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
//               size="sm"
//               id={`${row.original.id}-reviewer`}
//             >
//               <SelectValue placeholder="Assign reviewer" />
//             </SelectTrigger>
//             <SelectContent align="end">
//               <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
//               <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
//             </SelectContent>
//           </Select>
//         </>
//       )
//     },
//   },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="data-[state=open]:bg-muted text-muted-foreground flex size-8" size="icon">
            <MoreVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
