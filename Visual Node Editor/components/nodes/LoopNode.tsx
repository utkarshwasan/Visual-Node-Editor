"use client"

import { BaseNode } from "./BaseNode"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LoopNodeProps {
  data: {
    label: string
    iterations?: string
    loopType?: string
  }
}

export function LoopNode({ data }: LoopNodeProps) {
  return (
    <BaseNode data={data} inputs={["input", "iterations"]} outputs={["output", "index"]} className="min-w-[200px]">
      <div className="space-y-2">
        <Label htmlFor="loop-type" className="text-xs text-muted-foreground">
          Loop Type
        </Label>
        <Select value={data.loopType || "for"}>
          <SelectTrigger className="text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="for">For Loop</SelectItem>
            <SelectItem value="while">While Loop</SelectItem>
            <SelectItem value="foreach">For Each</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor="iterations" className="text-xs text-muted-foreground">
          Iterations
        </Label>
        <Input
          id="iterations"
          value={data.iterations || "{{count}}"}
          placeholder="{{variable}} or number"
          className="text-sm"
          readOnly
        />
      </div>
    </BaseNode>
  )
}
