---
title: "Y-OS"
slug: "y-os"
type: "project"
summary: "An operating system for cognition."
pillar: "mind"
status: "ready"
visibility: "public"
publish_to_site: true
one_liner: "Building cognitive infrastructure for the age of AI."
core_question: "How can humans maintain continuity, memory, context and agency across AI systems?"
parent_ecosystem: "youniverse"
nrelated_projects:
	- memory-os
	- youniverse
related_essays:
	- humans-lack-a-cognitive-operating-system
	- we-need-a-better-capture-consolidation-context-pipeline
related_concepts:
	- operating-system-for-cognition
	- memory-lifecycle-management
related_thinkers:
	- douglas-engelbart
	- kevin-kelly
---
# Y-OS
## One-line positioning
Y-OS is an operating system for cognition.
## Core question
How can humans maintain continuity, memory, context and agency across AI systems?
## Thesis
The age of AI does not only require better models. It requires better cognitive infrastructure.
As people work across ChatGPT, Claude, Manus, Cursor, browsers, notes, automations, files, meetings and agents, context gets lost. Memory is partial. Decisions disappear into conversations. Tools do not know what other tools know.
Y-OS explores the missing layer: a personal cognitive operating system that captures, consolidates, routes and injects context across models, agents, automations and knowledge systems.
## What Y-OS coordinates
Y-OS is not a single app. It is an architecture for orchestrating:
- memory,
- knowledge,
- agents,
- automations,
- prompts,
- workflows,
- context packs,
- model routing,
- action routing,
- and canonical knowledge.
## Core architecture
The current Y-OS architecture uses a layered model:
```plain text
Capture
↓
Recall
↓
Consolidate
↓
Canonicalize
↓
Route
↓
Inject
↓
Govern
```
In practical terms:
```plain text
Recall captures.
mem0 serves.
Manus consolidates.
Obsidian remembers.
Git protects.
Agents receive context packs.
```
For the current staging phase, Notion is temporarily used as a structured Markdown warehouse before migration into Obsidian / Y-World.
## CRT and ART
Y-OS includes two routing layers:
- **CRT — Cognitive Routing Table**: chooses the right model or reasoning system for the task.
- **ART — Agent Routing Table**: chooses the right agent, tool or execution environment.

The current CRT v0 is manual and simple:
```plain text
GPT     = architecture, final specs, QA, code review
Claude  = review, simplification, human tone, long-form polish
Manus   = build, repo, backend, integration, deployment
Lovable = fast UI exploration
Gemini  = multimodal and large-context tasks
Image model = image generation and editing
```
When context fidelity is critical, GPT generates the first canonical draft. Claude then reviews and simplifies. This prevents Claude from reinterpreting core architecture too early.
## Intellectual lineage
Y-OS belongs to a lineage of human-computer symbiosis and technological becoming. Douglas Engelbart is a key reference for augmenting human intellect. Kevin Kelly is a reference for understanding technology as an evolving ecosystem.
## Why it matters
Without a cognitive operating system, AI becomes a collection of powerful but disconnected tools.
Y-OS asks how a person can preserve continuity across them: what they know, what they decided, what they are building, what matters, what should be remembered, what should be forgotten, and what context each agent needs now.
## Related modules
- Memory OS
- CRT v0 / future CRT
- Agent routing
- Conversation Mirror / Live Notes
- Obsidian / Y-World canonical graph
- Git-backed memory filesystem
- Context packs for Manus, GPT, Claude, Cursor and other agents
## Open questions
- What is the minimum viable cognitive operating system?
- How much should be automated versus manually validated?
- How do we prevent memory from becoming noise?
- How do we route tasks cost-effectively across models and agents?
- How do we make AI augmentation increase agency instead of dependence?
## Current status
Ready P0 project page. GPT QA completed after Claude review.
