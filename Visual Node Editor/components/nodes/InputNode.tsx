import { BaseNode } from "./BaseNode"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputNodeProps {
  data: {
    label: string
    value: string
  }
}

export function InputNode({ data }: InputNodeProps) {
  return (
    <BaseNode data={data} outputs={["output"]}>
      <div className="space-y-2">
        <Label htmlFor="input-value" className="text-xs text-muted-foreground">
          Value
        </Label>
        <Input id="input-value" value={data.value} placeholder="Enter input value" className="text-sm" readOnly />
      </div>
    </BaseNode>
  )
}
