---
title: "Système d'exploitation en mémoire"
slug: memory-os
type: project
summary: "Un système d'exploitation dédié à la gestion du cycle de vie de la mémoire."
pillar: mind
status: ready
visibility: public
publish_to_site: true
one_liner: "Ce n'est pas une meilleure base de données vectorielle, mais un meilleur processus de capture → consolidation → mise en contexte."
core_question: "Comment la mémoire devrait-elle passer d'une expérience brute à un contexte validé pour les humains et les agents ?"
parent_project: y-os
related_projects:
  - y-os
  - youniverse
related_concepts:
  - memory-lifecycle-management
  - operating-system-for-cognition
related_essays:
  - memory-lifecycle-management
  - we-need-a-better-capture-consolidation-context-pipeline
translation:
  source_locale: en
  target_locale: fr
  source_file: /home/ubuntu/civilizational-awakening/client/src/content/en/projects/memory-os.md
  source_hash: d84ad286d94efd50
  provider: deepl
  translated_at: 2026-06-06T09:11:23.436Z
---

# Memory OS
## Présentation en une ligne
Memory OS est un système d'exploitation dédié à la gestion du cycle de vie de la mémoire.
## Question centrale
Comment la mémoire doit-elle passer d'une expérience brute à un contexte validé pour les humains et les agents ?
## Thèse
Le problème central de la mémoire en IA n'est pas la récupération. Il s'agit de la gestion du cycle de vie.
La plupart des systèmes de mémoire accumulent des fragments : encodages, résumés, historique de chat, bases de données vectorielles, notes, extraits et préférences. Ils récupèrent ces données, mais ne les consolident pas, ne les dédupliquent pas, ne résolvent pas les contradictions, ne les valident pas, ne les archivent pas et ne régissent pas ce qui devient canonique.
Memory OS recadre la mémoire en tant que pipeline :
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
## Types de mémoire
Y-OS distingue trois types de mémoire.
### Mémoire épisodique
Événements bruts et sessions.
Exemples :
- chats
- réunions
- documents
- enregistrements
- captures d'écran
- flux de capteurs et de capture
### Mémoire sémantique
Connaissances validées.
Exemples :
- faits
- décisions
- préférences
- connaissances de projet
- cadres conceptuels
### Mémoire procédurale
Règles et processus.
Exemples :
- invites
- règles de routage
- workflows
- compétences
- protocoles d'automatisation
## Principe actuel
```plain text
Recall captures.
mem0 serves.
Manus consolidates.
Obsidian remembers.
Git protects.
Agents receive context packs.
```
Dans la phase de transition actuelle, Notion est utilisé comme entrepôt intermédiaire pour les documents Markdown. La direction canonique de la mémoire reste Obsidian / Y-World avec protection Git.
## Pourquoi c'est important
Sans gestion du cycle de vie de la mémoire, les systèmes d'IA échouent de deux manières opposées :
1. Ils oublient ce qui compte.

2. Ils retiennent trop de bruit.
Un système d'exploitation de la mémoire décide non seulement de ce qu'il faut récupérer, mais aussi de ce qu'il faut promouvoir, fusionner, remplacer, archiver, valider et injecter dans le contexte d'exécution.
## Rôle dans Y-OS
Le système d'exploitation de la mémoire est le sous-système de mémoire de Y-OS.
Il prend en charge :
- la capture brute,
- la récupération sémantique,
- la consolidation,
- la gestion des contradictions,
- la création de connaissances canoniques,
- les packs de contexte d'exécution,
- la continuité inter-LLM et inter-sessions,
- et la gouvernance de ce que les agents sont autorisés à savoir ou à utiliser.
## Principe de conception clé
```plain text
We do not need a better vector DB.
We need a better capture → consolidation → context pipeline.
```
## Composants associés
- Couche de rappel / capture
- mem0 / service de mémoire programmable
- Manus / moteur de consolidation
- Obsidian / graphe canonique Y-World
- Git / gestion des versions et protection
- Paquets de contexte pour les agents
- CRT / règles de routage ART
## Questions en suspens
- Que faut-il capturer automatiquement ?
- Que faut-il valider manuellement ?
- Quand les mémoires doivent-elles être fusionnées, remplacées ou supprimées ?
- Comment les contradictions doivent-elles être mises en évidence ?
- Comment les agents reçoivent-ils juste assez de contexte sans être surchargés ?
## État d'avancement
Page du projet P0 prête. QA GPT terminé après révision par Claude.
