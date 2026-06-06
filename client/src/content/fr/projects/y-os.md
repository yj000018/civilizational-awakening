---
title: Y-OS
slug: y-os
type: project
summary: "Un système d'exploitation dédié à la cognition."
pillar: mind
status: ready
visibility: public
publish_to_site: true
one_liner: "Construire une infrastructure cognitive pour l'ère de l'IA."
core_question: "Comment les humains peuvent-ils préserver la continuité, la mémoire, le contexte et leur capacité d'action dans les systèmes d'IA ?"
parent_ecosystem: youniverse
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
translation:
  source_locale: en
  target_locale: fr
  source_file: /home/ubuntu/civilizational-awakening/client/src/content/en/projects/y-os.md
  source_hash: 73cf27ca45e95ff2
  provider: deepl
  translated_at: 2026-06-06T09:11:31.639Z
---

# Y-OS
## Présentation en une ligne
Y-OS est un système d'exploitation dédié à la cognition.
## Question centrale
Comment les humains peuvent-ils préserver la continuité, la mémoire, le contexte et leur capacité d'action à travers les différents systèmes d'IA ?
## Thèse
L'ère de l'IA ne nécessite pas seulement de meilleurs modèles. Elle nécessite une meilleure infrastructure cognitive.
À mesure que les utilisateurs jonglent entre ChatGPT, Claude, Manus, Cursor, les navigateurs, les notes, les automatisations, les fichiers, les réunions et les agents, le contexte se perd. La mémoire est partielle. Les décisions se noient dans les conversations. Les outils ignorent ce que savent les autres outils.
Y-OS explore la couche manquante : un système d'exploitation cognitif personnel qui capture, consolide, achemine et injecte le contexte à travers les modèles, les agents, les automatisations et les systèmes de connaissance.
## Ce que coordonne Y-OS
Y-OS n'est pas une simple application. C'est une architecture permettant d'orchestrer :
- la mémoire,
- la connaissance,
- les agents,
- les automatisations,
- les invites,
- les flux de travail,
- les packs de contexte,
- le routage des modèles,
- le routage des actions,
- et la connaissance canonique.
## Architecture de base
L'architecture actuelle de Y-OS utilise un modèle en couches :
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
Concrètement :
```plain text
Recall captures.
mem0 serves.
Manus consolidates.
Obsidian remembers.
Git protects.
Agents receive context packs.
```
Pour la phase de mise en place actuelle, Notion est temporairement utilisé comme entrepôt Markdown structuré avant la migration vers Obsidian / Y-World.
## CRT et ART
Y-OS comprend deux couches de routage :
- **CRT — Cognitive Routing Table** : choisit le modèle ou le système de raisonnement adapté à la tâche.
- **ART — Agent Routing Table** : choisit l'agent, l'outil ou l'environnement d'exécution approprié.

La version actuelle de CRT v0 est manuelle et simple :
```plain text
GPT     = architecture, final specs, QA, code review
Claude  = review, simplification, human tone, long-form polish
Manus   = build, repo, backend, integration, deployment
Lovable = fast UI exploration
Gemini  = multimodal and large-context tasks
Image model = image generation and editing
```
Lorsque la fidélité au contexte est essentielle, GPT génère la première ébauche canonique. Claude la révise et la simplifie ensuite. Cela empêche Claude de réinterpréter l'architecture de base trop tôt.
## Héritage intellectuel
Y-OS s'inscrit dans une lignée de symbiose homme-machine et d'évolution technologique. Douglas Engelbart est une référence clé pour l'augmentation de l'intellect humain. Kevin Kelly est une référence pour comprendre la technologie comme un écosystème en évolution.
## Pourquoi c'est important
Sans système d'exploitation cognitif, l'IA devient un ensemble d'outils puissants mais déconnectés.
Y-OS s'interroge sur la manière dont une personne peut préserver la continuité entre ces éléments : ce qu'elle sait, ce qu'elle a décidé, ce qu'elle construit, ce qui importe, ce qu'il faut retenir, ce qu'il faut oublier, et de quel contexte chaque agent a besoin à présent.
## Modules associés
- Memory OS
- CRT v0 / futur CRT
- Routage des agents
- Conversation Mirror / Live Notes
- Obsidian / Graphique canonique Y-World
- Système de fichiers mémoire basé sur Git
- Packs de contexte pour Manus, GPT, Claude, Cursor et d'autres agents
## Questions ouvertes
- Quel est le système d'exploitation cognitif minimum viable ?
- Quelle part doit être automatisée par rapport à celle validée manuellement ?
- Comment empêcher la mémoire de devenir du bruit ?
- Comment acheminer les tâches de manière rentable entre les modèles et les agents ?
- Comment faire en sorte que l'augmentation de l'IA renforce l'autonomie plutôt que la dépendance ?
## État d'avancement
Page du projet P0 prête. QA GPT terminé après révision par Claude.
