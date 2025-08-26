import { type NextRequest, NextResponse } from "next/server"

interface Node {
  id: string
  type: string
  data: any
}

interface Edge {
  id: string
  source: string
  target: string
}

// Kahn's algorithm for topological sorting (DAG validation)
function isValidDAG(nodes: Node[], edges: Edge[]): boolean {
  const nodeIds = new Set(nodes.map((n) => n.id))
  const inDegree = new Map<string, number>()
  const adjList = new Map<string, string[]>()

  // Initialize
  nodeIds.forEach((id) => {
    inDegree.set(id, 0)
    adjList.set(id, [])
  })

  // Build graph
  edges.forEach((edge) => {
    if (nodeIds.has(edge.source) && nodeIds.has(edge.target)) {
      adjList.get(edge.source)?.push(edge.target)
      inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1)
    }
  })

  // Kahn's algorithm
  const queue: string[] = []
  inDegree.forEach((degree, node) => {
    if (degree === 0) queue.push(node)
  })

  let processedCount = 0
  while (queue.length > 0) {
    const current = queue.shift()!
    processedCount++

    adjList.get(current)?.forEach((neighbor) => {
      const newDegree = (inDegree.get(neighbor) || 0) - 1
      inDegree.set(neighbor, newDegree)
      if (newDegree === 0) {
        queue.push(neighbor)
      }
    })
  }

  return processedCount === nodeIds.size
}

export async function POST(request: NextRequest) {
  try {
    const { nodes, edges } = await request.json()

    const isValid = isValidDAG(nodes, edges)

    return NextResponse.json({
      is_valid: isValid,
      is_dag: isValid,
      num_nodes: nodes.length,
      num_edges: edges.length,
      node_count: nodes.length,
      edge_count: edges.length,
      message: isValid ? "Valid DAG structure" : "Contains cycles or invalid connections",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to validate pipeline" }, { status: 500 })
  }
}
