"use client"

import { BaseNode } from "./BaseNode"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useMemo } from "react"

interface MathNodeProps {
  data: {
    label: string
    expression: string
  }
}

export function MathNode({ data }: MathNodeProps) {
  // Extract variables from mathematical expression
  const variables = useMemo(() => {
    const matches = data.expression.match(/\{\{(\w+)\}\}/g)
    return matches ? matches.map((match) => match.slice(2, -2)) : []
  }, [data.expression])

  return (
    <BaseNode
      data={data}
      inputs={variables.length > 0 ? variables : ["input"]}
      outputs={["result"]}
      className="min-w-[220px]"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="math-expression" className="text-xs text-muted-foreground">
            Expression
          </Label>
          <Badge variant="outline" className="text-xs">
            Math
          </Badge>
        </div>
        <Input
          id="math-expression"
          value={data.expression}
          placeholder="e.g., {{a}} + {{b}} * 2"
          className="text-sm font-mono"
          readOnly
        />
        {variables.length > 0 && <div className="text-xs text-gray-400">Variables: {variables.join(", ")}</div>}
      </div>
    </BaseNode>
  )
}
