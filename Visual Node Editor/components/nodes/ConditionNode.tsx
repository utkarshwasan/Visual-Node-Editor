"use client"

import { BaseNode } from "./BaseNode"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ConditionNodeProps {
  data: {
    label: string
    condition?: string
    operator?: string
    value?: string
  }
}

export function ConditionNode({ data }: ConditionNodeProps) {
  return (
    <BaseNode data={data} inputs={["input", "condition"]} outputs={["true", "false"]} className="min-w-[200px]">
      <div className="space-y-2">
        <Label htmlFor="condition" className="text-xs text-muted-foreground">
          Condition
        </Label>
        <Input
          id="condition"
          value={data.condition || "{{input}}"}
          placeholder="{{variable}}"
          className="text-sm"
          readOnly
        />
        <div className="flex gap-2">
          <Select value={data.operator || "equals"}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="equals">Equals</SelectItem>
              <SelectItem value="greater">Greater</SelectItem>
              <SelectItem value="less">Less</SelectItem>
              <SelectItem value="contains">Contains</SelectItem>
            </SelectContent>
          </Select>
          <Input value={data.value || ""} placeholder="Value" className="text-sm" readOnly />
        </div>
      </div>
    </BaseNode>
  )
}
