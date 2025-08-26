Visual Node Editor 🚀
A sleek, full-stack visual programming interface for crafting and validating complex data pipelines with ease. Powered by Next.js and React Flow on the frontend, paired with a Python FastAPI backend for robust validation. Inspired by tools like n8n, this app delivers a modern, drag-and-drop canvas for building workflows intuitively. 🌟
📋 Table of Contents

✨ Features
🛠 Tech Stack
📂 Project Structure
🚀 Getting Started
✅ Prerequisites
🛠 Installation & Setup


🎮 How to Use
🧠 Core Concepts
🧩 The Node System
🔗 Dynamic Variables
✔ Pipeline Validation



✨ Features

🎨 Intuitive Drag-and-Drop Canvas: Visually design complex workflows by placing and connecting nodes effortlessly.
📚 Rich Node Library: A versatile set of nodes to tackle diverse tasks [cite: visual-node-editor/app/page.tsx]:
🔽 Input / Output: Set entry and exit points for your data flow.
📝 Text: Manipulate strings with dynamic {{variable}} support.
🤖 LLM: Seamlessly integrate Large Language Model prompts.
➕ Math: Run mathematical calculations with ease.
🔀 Condition: Branch logic based on custom conditions.
🔄 Loop: Iterate over data or repeat actions.
🌐 API: Fetch or send data via external HTTP requests.
🔗 Merge: Combine multiple data streams into one.


🔗 Dynamic Variable Handles: Text and LLM nodes auto-detect {{variable}} syntax, generating input handles for smooth pipeline creation [cite: visual-node-editor/components/nodes/TextNode.tsx, visual-node-editor/components/nodes/LLMNode.tsx].
🛡 Backend Pipeline Validation: Before running, the graph is validated using Kahn's algorithm to ensure a cycle-free Directed Acyclic Graph (DAG), preventing infinite loops [cite: visual-node-editor/backend/main.py, visual-node-editor/app/api/validate-pipeline/route.ts].
📱 Modern & Responsive UI: Built with Tailwind CSS and shadcn/ui, offering a clean, accessible, and themeable interface for all devices [cite: visual-node-editor/tailwind.config.ts].
🖱 Interactive Controls: Zoom, pan, and navigate large workflows with a handy minimap [cite: visual-node-editor/app/page.tsx].

🛠 Tech Stack



Category
Technology



Frontend
Next.js (React), TypeScript


UI/UX
React Flow (@xyflow/react), Tailwind CSS, shadcn/ui


Backend
Python, FastAPI


Languages
TypeScript, Python, CSS


Tooling
npm, pip


📂 Project Structure
visual-node-editor/
├── app/                  # Next.js App Router: core frontend logic 🌐
│   ├── api/              # API routes for pipeline validation 🛡
│   ├── page.tsx          # Main canvas page 🎨
│   └── layout.tsx        # Root layout for the app 🏗
├── backend/              # FastAPI Python backend 🐍
│   ├── main.py           # Core API with DAG validation logic ✅
│   └── requirements.txt  # Python dependencies 📦
├── components/           # Reusable React components 🧩
│   ├── nodes/            # Custom React Flow nodes ⚙
│   └── ui/               # shadcn/ui components 🎨
├── lib/                  # Utility functions 🛠
├── public/               # Static assets (images, etc.) 🖼
└── tailwind.config.ts    # Tailwind CSS configuration 🎨

🚀 Getting Started
✅ Prerequisites

Node.js (v18 or later)
npm (or yarn/pnpm)
Python (v3.8 or later)
pip (Python package installer)

🛠 Installation & Setup
Get the project up and running in just a few steps!

Clone the repository:
git clone https://github.com/your-username/visual-node-editor.git
cd visual-node-editor


Set up the Frontend (Next.js):
# Install dependencies
npm install

# Start the development server
npm run dev

🎉 Frontend is live at http://localhost:3000.

Set up the Backend (FastAPI):Open a new terminal and navigate to the backend folder:
# Navigate to backend
cd backend

# (Recommended) Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload

🛡 Backend API is live at http://localhost:8000.


🎮 How to Use

Launch the App: Ensure both frontend and backend servers are running.
Add Nodes: Drag nodes from the "Node Library" panel (left side) onto the canvas.
Connect Nodes: Link nodes by dragging from an output handle (right) to an input handle (left).
Configure Nodes: For Text or LLM nodes, use {{variables}} in templates to auto-generate input handles.
Validate Pipeline: Click "Validate Pipeline" to check if your workflow is a valid DAG. You'll get instant feedback! ✅
Reset: Hit "Reset Workflow" to clear the canvas and start fresh. 🧹

🧠 Core Concepts
🧩 The Node System
The heart of the editor lies in its node-based system, powered by React Flow.

BaseNode.tsx: A reusable component wrapping all custom nodes, providing a consistent structure with titles, delete buttons, and handle logic [cite: visual-node-editor/components/nodes/BaseNode.tsx].
Custom Nodes: Each node (e.g., TextNode.tsx, ApiNode.tsx) in components/nodes/ manages its own look and logic for maximum flexibility.

🔗 Dynamic Variables
Create dynamic pipelines with ease! Nodes like TextNode and LLMNode scan for {{variableName}} syntax and dynamically generate input handles for each unique variable, letting you pipe data seamlessly across your workflow [cite: visual-node-editor/components/nodes/TextNode.tsx].
✔ Pipeline Validation
To keep workflows logical, the frontend sends nodes and edges to a FastAPI endpoint. The backend uses Kahn's algorithm to perform topological sorting, detecting cycles and ensuring your pipeline is valid and loop-free [cite: visual-node-editor/backend/main.py].
