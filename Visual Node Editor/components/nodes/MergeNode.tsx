"use client"

import { BaseNode } from "./BaseNode"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MergeNodeProps {
  data: {
    label: string
    mergeType?: string
  }
}

export function MergeNode({ data }: MergeNodeProps) {
  return (
    <BaseNode data={data} inputs={["input1", "input2", "input3"]} outputs={["output"]} className="min-w-[180px]">
      <div className="space-y-2">
        <Label htmlFor="merge-type" className="text-xs text-muted-foreground">
          Merge Strategy
        </Label>
        <Select value={data.mergeType || "concat"}>
          <SelectTrigger className="text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="concat">Concatenate</SelectItem>
            <SelectItem value="merge">Merge Objects</SelectItem>
            <SelectItem value="array">Create Array</SelectItem>
            <SelectItem value="join">Join Strings</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-xs text-muted-foreground">Combines multiple inputs into one output</div>
      </div>
    </BaseNode>
  )
}
