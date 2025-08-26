import { BaseNode } from "./BaseNode"
import { Badge } from "@/components/ui/badge"

interface OutputNodeProps {
  data: {
    label: string
  }
}

export function OutputNode({ data }: OutputNodeProps) {
  return (
    <BaseNode data={data} inputs={["input"]} outputs={[]}>
      <div className="text-center py-2">
        <Badge variant="outline" className="text-xs">
          Final Output
        </Badge>
      </div>
    </BaseNode>
  )
}
