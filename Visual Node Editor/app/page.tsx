"use client"

import { useCallback, useState } from "react"
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
  BackgroundVariant,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

import { InputNode } from "@/components/nodes/InputNode"
import { OutputNode } from "@/components/nodes/OutputNode"
import { TextNode } from "@/components/nodes/TextNode"
import { LLMNode } from "@/components/nodes/LLMNode"
import { MathNode } from "@/components/nodes/MathNode"
import { ConditionNode } from "@/components/nodes/ConditionNode"
import { LoopNode } from "@/components/nodes/LoopNode"
import { ApiNode } from "@/components/nodes/ApiNode"
import { MergeNode } from "@/components/nodes/MergeNode"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  text: TextNode,
  llm: LLMNode,
  math: MathNode,
  condition: ConditionNode,
  loop: LoopNode,
  api: ApiNode,
  merge: MergeNode,
}

const initialNodes = [
  {
    id: "1",
    type: "input",
    position: { x: 100, y: 100 },
    data: { label: "User Input", value: "Hello World" },
  },
  {
    id: "2",
    type: "text",
    position: { x: 400, y: 100 },
    data: {
      label: "Text Processor",
      text: "Welcome {{name}}! Your message: {{input}}. Processing at {{timestamp}}.",
    },
  },
  {
    id: "3",
    type: "llm",
    position: { x: 100, y: 300 },
    data: {
      label: "AI Assistant",
      prompt: "You are a helpful assistant. Respond to: {{message}}",
    },
  },
  {
    id: "4",
    type: "math",
    position: { x: 400, y: 300 },
    data: {
      label: "Calculator",
      expression: "{{a}} + {{b}} * 2",
    },
  },
  {
    id: "5",
    type: "output",
    position: { x: 700, y: 200 },
    data: { label: "Final Output" },
  },
]

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", sourceHandle: "output", targetHandle: "input" },
  { id: "e2-5", source: "2", target: "5", sourceHandle: "output", targetHandle: "input" },
]

export default function VisualNodeEditor() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [pipelineStatus, setPipelineStatus] = useState<string>("")

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const resetWorkflow = () => {
    setNodes([])
    setEdges([])
    setPipelineStatus("")
  }

  const validatePipeline = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      })
      const result = await response.json()

      const alertMessage = `🔍 Pipeline Analysis Results:

📊 Statistics:
• Number of Nodes: ${result.num_nodes}
• Number of Edges: ${result.num_edges}
• Is DAG: ${result.is_dag ? "Yes ✅" : "No ❌"}

${result.is_dag ? "\n💡 Details: Valid DAG structure" : "\n💡 Details: Contains cycles or invalid connections"}`

      alert(alertMessage)
      setPipelineStatus(result.is_dag ? "Valid DAG ✓" : "Invalid Pipeline ✗")
    } catch (error) {
      alert("❌ Error validating pipeline. Please check your connection and try again.")
      setPipelineStatus("Validation Error")
    }
  }

  const addNode = (type: string) => {
    const nodeId = `${Date.now()}`
    const newNode = {
      id: nodeId,
      type,
      position: {
        x: Math.random() * 300 + 150,
        y: Math.random() * 300 + 150,
      },
      data: {
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
        nodeId,
        ...(type === "text" && { text: "Enter text with {{variables}}" }),
        ...(type === "llm" && { prompt: "Enter your prompt with {{variables}}" }),
        ...(type === "math" && { expression: "{{x}} + {{y}}" }),
        ...(type === "input" && { value: "Default value" }),
        ...(type === "condition" && { condition: "{{input}}", operator: "equals", value: "true" }),
        ...(type === "loop" && { iterations: "{{count}}", loopType: "for" }),
        ...(type === "api" && { url: "{{endpoint}}", method: "GET" }),
        ...(type === "merge" && { mergeType: "concat" }),
      },
    }
    setNodes((nds) => (nds.some((n) => n.id === newNode.id) ? nds : [...nds, newNode as any]))
  }

  return (
    <div className="h-screen flex flex-col node-editor-canvas">
      <div className="border-b bg-card/80 backdrop-blur-sm p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Visual Node Editor
            </h1>
            <p className="text-muted-foreground mt-1">Build intelligent pipelines with drag-and-drop nodes</p>
          </div>
          <div className="flex items-center gap-3">
            {pipelineStatus && (
              <Badge
                variant={pipelineStatus.includes("✓") ? "default" : "destructive"}
                className="px-3 py-1 font-medium"
              >
                {pipelineStatus}
              </Badge>
            )}
            <Button onClick={resetWorkflow} className="reset-button">
              🔄 Reset Workflow
            </Button>
            <Button onClick={validatePipeline} className="submit-button">
              ✅ Validate Pipeline
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        <Card className="node-editor-sidebar w-72 m-4 p-6">
          <div className="mb-6">
            <h3 className="font-bold text-lg text-foreground mb-2">🧩 Node Library</h3>
            <p className="text-sm text-muted-foreground">Drag nodes to the canvas</p>
          </div>

          <div className="space-y-3">
            {[
              { type: "input", icon: "📥", desc: "Data input" },
              { type: "output", icon: "📤", desc: "Final output" },
              { type: "text", icon: "📝", desc: "Text processing" },
              { type: "llm", icon: "🤖", desc: "AI assistant" },
              { type: "math", icon: "🔢", desc: "Mathematical operations" },
              { type: "condition", icon: "🔀", desc: "Conditional logic" },
              { type: "loop", icon: "🔄", desc: "Iteration control" },
              { type: "api", icon: "🌐", desc: "API calls" },
              { type: "merge", icon: "🔗", desc: "Data merging" },
            ].map(({ type, icon, desc }) => (
              <Button key={type} onClick={() => addNode(type)} className="node-button w-full justify-start h-auto p-4">
                <div className="flex items-center gap-3 w-full">
                  <span className="text-xl">{icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                    <div className="text-xs text-secondary">{desc}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">⚡ Features</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Dynamic variable detection
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Auto-generated handles
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Pipeline validation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                Real-time updates
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                Delete individual nodes
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                Reset entire workflow
              </li>
            </ul>
          </div>
        </Card>

        <div className="flex-1 m-4 ml-0">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl shadow-xl"
            fitView
            attributionPosition="bottom-left"
          >
            <Controls className="bg-card/80 backdrop-blur-sm border border-border rounded-lg shadow-lg text-black" />
            <MiniMap
              className="bg-card/80 backdrop-blur-sm border border-border rounded-lg shadow-lg"
              nodeColor="#15803d"
              maskColor="rgba(0, 0, 0, 0.1)"
            />
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1.5}
              color="hsl(var(--muted-foreground) / 0.3)"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}
