"use client"

import { BaseNode } from "./BaseNode"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useMemo } from "react"

interface LLMNodeProps {
  data: {
    label: string
    prompt: string
  }
}

export function LLMNode({ data }: LLMNodeProps) {
  // Extract variables from prompt
  const variables = useMemo(() => {
    const matches = data.prompt.match(/\{\{(\w+)\}\}/g)
    return matches ? matches.map((match) => match.slice(2, -2)) : []
  }, [data.prompt])

  return (
    <BaseNode
      data={data}
      inputs={variables.length > 0 ? variables : ["input"]}
      outputs={["output"]}
      className="min-w-[280px]"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="llm-prompt" className="text-xs text-muted-foreground">
            AI Prompt
          </Label>
          <Badge variant="outline" className="text-xs">
            GPT-4
          </Badge>
        </div>
        <Textarea
          id="llm-prompt"
          value={data.prompt}
          placeholder="Enter AI prompt with {{variables}}"
          className="text-sm min-h-[100px] resize-none"
          readOnly
        />
        {variables.length > 0 && <div className="text-xs text-muted-foreground">Variables: {variables.join(", ")}</div>}
      </div>
    </BaseNode>
  )
}
