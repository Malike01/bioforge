# BioForge: Software Design Document (SDD)

**Version:** 1.0.0-draft  
**Last Updated:** 2026
**Status:** Architecture Definition Phase

---

## 1. Introduction

### 1.1 Purpose

This document provides a comprehensive architectural overview of BioForge. It serves as the primary reference for the system's design, data models, and integration standards.

### 1.2 Scope

BioForge aims to handle the **Design-Build-Test-Learn** cycle of synthetic biology. Phase 1 focuses on the **Design** and **Analyze** (AI) modules.

---

## 2. Interoperability & Standards

BioForge is designed to be a "good citizen" in the global biotech ecosystem. We strictly adhere to the following standards to ensure data portability:

### 2.1 Synthetic Biology Open Language (SBOL)

- The internal data model maps 1:1 with **SBOL v3** entities.
- **ComponentDefinition:** Maps to our `BioPart`.
- **SequenceAnnotation:** Maps to the visual positioning on our Canvas.

### 2.2 Sequence Ontology (SO)

All biological parts are typed using valid **Sequence Ontology (SO)** IDs to ensure semantic correctness across databases.

- **Promoter:** `SO:0000167`
- **RBS:** `SO:0000139`
- **CDS:** `SO:0000316`
- **Terminator:** `SO:0000141`

---

## 3. System Architecture

BioForge utilizes a **Modular Monolith** architecture wrapped in Docker containers. This allows for shared memory and rapid development while maintaining clear boundaries for a future microservices migration.

### 3.1 Architecture Diagram

_(Conceptual)_
`[Client (React)] <--> [API Gateway (Nginx)] <--> [App Server (FastAPI)] <--> [DB Cluster]`

### 3.2 Component Details

#### A. Frontend (The Designer)

- **Core:** React 18 with TypeScript.
- **Canvas Engine:** `react-flow` is used for the DAG (Directed Acyclic Graph) representation of genetic circuits.
- **State Management:** `zustand` is used for transient canvas state; `react-query` for server state.

#### B. Backend (The Bio-Engine)

- **Core:** FastAPI (Python).
- **Bio-Logic:** `Biopython` for sequence manipulation (Reverse complement, translation, GC content calculation).
- **Validation:** Custom logic to enforce grammar (e.g., _Promoters must precede RBS_).

#### C. Intelligence Layer (AI)

- **LLM Integration:** LangChain orchestrates calls to OpenAI/Llama models.
- **Knowledge Base:** Pinecone (Vector DB) stores embeddings of curated PubMed abstracts related to synthetic biology parts.

---

## 4. Data Design

### 4.1 ER Diagram (Simplified)

#### Table: `bio_parts` (Library)

The catalog of available genetic parts (Lego blocks).

| Column     | Type    | Description                               |
| :--------- | :------ | :---------------------------------------- |
| `id`       | UUID    | Primary Key                               |
| `name`     | VARCHAR | Common name (e.g., "pLac")                |
| `so_term`  | VARCHAR | Sequence Ontology ID (e.g., "SO:0000167") |
| `sequence` | TEXT    | Raw DNA sequence (ATGC...)                |
| `metadata` | JSONB   | Melting temp, organism source, etc.       |

#### Table: `designs` (Projects)

User-created genetic circuits.

| Column         | Type    | Description                          |
| :------------- | :------ | :----------------------------------- |
| `id`           | UUID    | Primary Key                          |
| `user_id`      | UUID    | Owner                                |
| `canvas_state` | JSONB   | React Flow nodes/edges serialization |
| `compiled_seq` | TEXT    | The final assembled sequence         |
| `is_valid`     | BOOLEAN | Validation status                    |

---

## 5. API Interface (Phase 1)

### 5.1 Design Module

**`POST /api/v1/design/validate`**
Input: JSON representation of the graph.
Output: List of biological errors or warnings.

## Security & Compliance

Authentication: JWT (JSON Web Tokens) via OAuth2 standards.
Data Safety: BioForge is designed to be HIPAA-compliant ready. All genomic data is encrypted at rest (AES-256).
