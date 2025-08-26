"use client"

import type React from "react"

import { BaseNode } from "./BaseNode"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useMemo, useState, useCallback } from "react"
import { useUpdateNodeInternals } from "@xyflow/react"

interface TextNodeProps {
  id: string
  data: {
    label: string
    text: string
  }
}

export function TextNode({ id, data }: TextNodeProps) {
  const [text, setText] = useState(data.text)
  const updateNodeInternals = useUpdateNodeInternals()

  const variables = useMemo(() => {
    const matches = text.match(/\{\{(\w+)\}\}/g)
    return matches ? matches.map((match) => match.slice(2, -2)) : []
  }, [text])

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value)
      setTimeout(() => updateNodeInternals(id), 0)
    },
    [id, updateNodeInternals],
  )

  const textareaHeight = useMemo(() => {
    const lines = text.split("\n").length
    const minHeight = 100
    const lineHeight = 24
    const maxHeight = 300
    return Math.min(maxHeight, Math.max(minHeight, lines * lineHeight + 40))
  }, [text])

  const nodeWidth = useMemo(() => {
    const minWidth = 280
    const maxWidth = 500
    const charWidth = 8
    const longestLine = text.split("\n").reduce((max, line) => Math.max(max, line.length), 0)
    return Math.min(maxWidth, Math.max(minWidth, longestLine * charWidth + 120))
  }, [text])

  return (
    <BaseNode
      id={id}
      data={data}
      inputs={variables.length > 0 ? variables : ["input"]}
      outputs={["output"]}
      className="text-node"
      style={{ width: nodeWidth }}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="text-content" className="text-sm font-medium" style={{ color: "#4FD1C5" }}>
            📝 Text Template
          </Label>
          {variables.length > 0 && (
            <Badge variant="outline" className="text-xs">
              {variables.length} variable{variables.length !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>

        <Textarea
          id="text-content"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}} for dynamic content..."
          className="text-sm resize-none border-2 focus:border-primary/50 transition-colors"
          style={{ height: `${textareaHeight}px` }}
        />

        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2 border-t border-border">
            <span className="text-xs mr-2" style={{ color: "#4FD1C5" }}>
              Variables:
            </span>
            {variables.map((variable, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                {variable}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </BaseNode>
  )
}
