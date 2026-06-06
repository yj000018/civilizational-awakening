---
title: "Memory OS"
slug: "memory-os"
type: "project"
summary: "An operating system for memory lifecycle management."
pillar: "mind"
status: "ready"
visibility: "public"
publish_to_site: true
one_liner: "Not a better vector database, but a better capture → consolidation → context pipeline."
core_question: "How should memory move from raw experience to validated context for humans and agents?"
parent_project: "y-os"
related_projects:
	- y-os
	- youniverse
related_concepts:
	- memory-lifecycle-management
	- operating-system-for-cognition
related_essays:
	- memory-lifecycle-management
	- we-need-a-better-capture-consolidation-context-pipeline
---
# Memory OS
## One-line positioning
Memory OS is an operating system for memory lifecycle management.
## Core question
How should memory move from raw experience to validated context for humans and agents?
## Thesis
The central memory problem in AI is not retrieval. It is lifecycle management.
Most memory systems accumulate fragments — embeddings, summaries, chat history, vector stores, notes, snippets and preferences. They retrieve, but they do not consolidate, deduplicate, resolve contradictions, validate, archive or govern what becomes canonical.
Memory OS reframes memory as a pipeline:
```plain text
raw
↓
extracted
↓
candidate
↓
validated
↓
canonical
↓
superseded / archived
```
## Memory types
Y-OS distinguishes three memory types.
### Episodic memory
Raw events and sessions.
Examples:
- chats
- meetings
- documents
- recordings
- screen captures
- sensor and capture streams
### Semantic memory
Validated knowledge.
Examples:
- facts
- decisions
- preferences
- project knowledge
- conceptual frameworks
### Procedural memory
Rules and processes.
Examples:
- prompts
- routing rules
- workflows
- skills
- automation protocols
## Current principle
```plain text
Recall captures.
mem0 serves.
Manus consolidates.
Obsidian remembers.
Git protects.
Agents receive context packs.
```
In the current transition phase, Notion is used as a staging warehouse for Markdown documents. The canonical memory direction remains Obsidian / Y-World with Git protection.
## Why it matters
Without memory lifecycle management, AI systems fail in two opposite directions:
1. They forget what matters.

2. They remember too much noise.
A memory OS decides not only what to retrieve, but what to promote, merge, supersede, archive, validate and inject into runtime context.
## Role in Y-OS
Memory OS is the memory subsystem of Y-OS.
It supports:
- raw capture,
- semantic recall,
- consolidation,
- contradiction management,
- canonical knowledge creation,
- runtime context packs,
- cross-LLM and cross-session continuity,
- and governance of what agents are allowed to know or use.
## Key design principle
```plain text
We do not need a better vector DB.
We need a better capture → consolidation → context pipeline.
```
## Related components
- Recall / capture layer
- mem0 / programmable memory service
- Manus / consolidation engine
- Obsidian / Y-World canonical graph
- Git / versioning and protection
- Context packs for agents
- CRT / ART routing rules
## Open questions
- What should be automatically captured?
- What must be manually validated?
- When should memories be merged, superseded or deleted?
- How should contradictions be surfaced?
- How do agents receive just enough context without being overloaded?
## Current status
Ready P0 project page. GPT QA completed after Claude review.
