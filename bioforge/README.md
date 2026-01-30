# BioForge: The Operating System for Synthetic Biology

> **Design. Simulate. Build.** > An integrated development environment (IDE) for genetic engineering, powered by AI and modern web technologies.

---

## 🧬 What is BioForge?

BioForge is an open-source platform designed to bridge the gap between **In Silico** design and **Wet Lab** execution. It replaces fragmented tools with a unified interface where biologists can design genetic circuits using a low-code canvas, validate them against biological rules, and query scientific literature using AI agents.

### Key Features

- **🎨 Visual Bio-CAD:** Drag-and-drop interface for designing genetic circuits (Promoters, RBS, CDS, Terminators) powered by **React Flow**.
- **🧠 AI-Driven Insights:** Integrated LLM agents (RAG architecture) that cross-reference your design with millions of PubMed articles.
- **⚡ Real-time Validation:** Instant feedback on biological viability using **SBOL** (Synthetic Biology Open Language) standards.
- **🔄 Interoperability:** Native support for exporting to **FASTA**, **GenBank**, and **SBOL** formats.

---

## 🛠 Tech Stack

We use a modern, scalable stack designed for high-performance data processing and interactive UI.

- **Frontend:** React 18, TypeScript, Zustand, React Flow, Vite, React Query, Shadcn/ui.
- **Backend:** Python 3.11, FastAPI, Biopython.
- **Data:** PostgreSQL (Relational), Pinecone (Vector DB), Redis (Caching).
- **DevOps:** Docker, Docker Compose.

---

## 🚀 Quick Start

BioForge is containerized for easy deployment.

### Prerequisites

- Docker & Docker Compose
- Node.js v18+ (for local frontend dev)

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/Malike01/bioforge.git](https://github.com/Malike01/bioforge.git)
    cd bioforge
    ```

2.  **Start the application**

    ```bash
    docker-compose up --build
    ```

3.  **Access the platform**
    - Frontend: `http://localhost:3000`
    - API Docs: `http://localhost:8000/docs`

---

## 📚 Documentation

For detailed architecture, data models, and biological standards compliance, please refer to the **[Software Design Document (SDD)](./docs/SDD.md)**.

## 🤝 Contributing

We welcome contributions from developers and biologists alike.
