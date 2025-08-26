# Visual Node Editor

A React Flow-based visual programming interface with FastAPI backend

## Features

- **Node Abstraction**: Reusable BaseNode component for consistent styling and behavior
- **Dynamic Text Nodes**: Auto-resizing text areas with variable detection ({{variableName}})
- **Multiple Node Types**: Input, Output, LLM, Text, Math, Condition, Loop, API, and Merge nodes
- **Pipeline Validation**: Backend DAG (Directed Acyclic Graph) detection
- **Modern UI**: Clean, responsive design with hover effects and proper accessibility

## Setup

### Frontend
\`\`\`bash
npm install --legacy-peer-deps
npm run dev
\`\`\`

### Backend
\`\`\`bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

## Usage

1. Drag and connect nodes in the visual editor
2. Use the Text node with {{variableName}} syntax to create dynamic inputs
3. Click "Submit Pipeline" to validate the graph structure
4. The backend will return node count, edge count, and DAG validation

## Architecture

- **Frontend**: React + React Flow for visual node editing
- **Backend**: FastAPI with CORS support for pipeline parsing
- **Node System**: Extensible BaseNode abstraction for easy node creation
- **Validation**: Topological sort algorithm for DAG detection
