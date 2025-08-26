from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import json

app = FastAPI()

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline_data: PipelineData):
    nodes = pipeline_data.nodes
    edges = pipeline_data.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # Check if the graph is a DAG using topological sort (Kahn's algorithm)
    is_dag = check_is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }

def check_is_dag(nodes, edges):
    """
    Check if the graph is a Directed Acyclic Graph (DAG) using Kahn's algorithm
    """
    # Create adjacency list and calculate in-degrees
    graph = {}
    in_degree = {}
    
    # Initialize all nodes
    for node in nodes:
        node_id = node['id']
        graph[node_id] = []
        in_degree[node_id] = 0
    
    # Build graph and calculate in-degrees
    for edge in edges:
        source = edge['source']
        target = edge['target']
        
        if source in graph and target in graph:
            graph[source].append(target)
            in_degree[target] += 1
    
    # Kahn's algorithm for topological sorting
    queue = []
    
    # Find all nodes with no incoming edges
    for node_id in in_degree:
        if in_degree[node_id] == 0:
            queue.append(node_id)
    
    processed_count = 0
    
    while queue:
        current = queue.pop(0)
        processed_count += 1
        
        # Remove edges from current node
        for neighbor in graph[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we processed all nodes, it's a DAG
    return processed_count == len(nodes)
