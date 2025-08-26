"use client"

import type React from "react"

import { Handle, Position, useReactFlow } from "@xyflow/react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { ReactNode } from "react"

interface BaseNodeProps {
  data: {
    label: string
    nodeId?: string
    [key: string]: any
  }
  children: ReactNode
  inputs?: string[]
  outputs?: string[]
  className?: string
  style?: React.CSSProperties
  id?: string
}

export function BaseNode({
  data,
  children,
  inputs = [],
  outputs = ["output"],
  className = "",
  style,
  id,
}: BaseNodeProps) {
  const { deleteElements, getNodes, getEdges } = useReactFlow()

  const handleDelete = () => {
    const nodeId = id || data.nodeId
    if (nodeId) {
      // Get all connected edges to this node
      const edges = getEdges()
      const connectedEdges = edges.filter((edge) => edge.source === nodeId || edge.target === nodeId)

      // Delete both the node and its connected edges
      deleteElements({
        nodes: [{ id: nodeId }],
        edges: connectedEdges,
      })
    }
  }

  return (
    <Card className={`node-container min-w-[200px] ${className}`} style={style}>
      <div className="node-header">
        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 font-medium">
          {data.label}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="delete-button hover:bg-red-500/20 hover:text-red-400 transition-colors"
          title="Delete node"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>

      <div className="node-content">{children}</div>

      {inputs.map((input, index) => (
        <Handle
          key={`input-${input}`}
          type="target"
          position={Position.Left}
          id={input}
          style={{
            top: `${45 + index * 28}px`,
            background: "#22c55e",
            width: 12,
            height: 12,
            border: "2px solid hsl(var(--background))",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
          className="node-handle node-handle-input transition-all duration-200 hover:scale-110"
        />
      ))}

      {outputs.map((output, index) => (
        <Handle
          key={`output-${output}`}
          type="source"
          position={Position.Right}
          id={output}
          style={{
            top: `${45 + index * 28}px`,
            background: "#ef4444",
            width: 12,
            height: 12,
            border: "2px solid hsl(var(--background))",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
          className="node-handle node-handle-output transition-all duration-200 hover:scale-110"
        />
      ))}
    </Card>
  )
}
