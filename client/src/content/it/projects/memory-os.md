---
title: Sistema operativo di memoria
slug: memory-os
type: project
summary: Un sistema operativo per la gestione del ciclo di vita della memoria.
pillar: mind
status: ready
visibility: public
publish_to_site: true
one_liner: Non un database vettoriale migliore, ma un processo più efficiente di acquisizione → consolidamento → contestualizzazione.
core_question: In che modo la memoria dovrebbe passare dall’esperienza grezza a un contesto convalidato per gli esseri umani e gli agenti?
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
  target_locale: it
  source_file: /home/runner/work/civilizational-awakening/civilizational-awakening/client/src/content/en/projects/memory-os.md
  source_hash: d84ad286d94efd50
  provider: deepl
  translated_at: 2026-10-02T11:51:29.798Z
---

# Memory OS
## Definizione in una riga
Memory OS è un sistema operativo per la gestione del ciclo di vita della memoria.
## Domanda fondamentale
In che modo la memoria dovrebbe passare dall’esperienza grezza a un contesto convalidato per gli esseri umani e gli agenti?
## Tesi
Il problema centrale della memoria nell’IA non è il recupero. È la gestione del ciclo di vita.
La maggior parte dei sistemi di memoria accumula frammenti: embedding, riassunti, cronologia delle chat, archivi vettoriali, note, snippet e preferenze. Questi sistemi recuperano i dati, ma non li consolidano, non li deduplicano, non risolvono le contraddizioni, non li convalidano, non li archiviano né regolano ciò che diventa canonico.
Memory OS ridefinisce la memoria come una pipeline:
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
## Tipi di memoria
Y-OS distingue tre tipi di memoria.
### Memoria episodica
Eventi e sessioni grezzi.
Esempi:
- chat
- riunioni
- documenti
- registrazioni
- schermate
- flussi di sensori e acquisizioni
### Memoria semantica
Conoscenza convalidata.
Esempi:
- fatti
- decisioni
- preferenze
- conoscenze relative ai progetti
- quadri concettuali
### Memoria procedurale
Regole e processi.
Esempi:
- prompt
- regole di instradamento
- flussi di lavoro
- competenze
- protocolli di automazione
## Principio attuale
```plain text
Recall captures.
mem0 serves.
Manus consolidates.
Obsidian remembers.
Git protects.
Agents receive context packs.
```
Nell’attuale fase di transizione, Notion viene utilizzato come magazzino temporaneo per i documenti Markdown. La direzione canonica della memoria rimane Obsidian / Y-World con protezione Git.
## Perché è importante
Senza una gestione del ciclo di vita della memoria, i sistemi di IA falliscono in due direzioni opposte:
1. Dimenticano ciò che conta.

2. Ricordano troppe informazioni irrilevanti.
Un sistema operativo di memoria decide non solo cosa recuperare, ma anche cosa promuovere, unire, sostituire, archiviare, convalidare e inserire nel contesto di esecuzione.
## Ruolo in Y-OS
Il sistema operativo di memoria è il sottosistema di memoria di Y-OS.
Supporta:
- acquisizione grezza,
- recupero semantico,
- il consolidamento,
- la gestione delle contraddizioni,
- la creazione di conoscenza canonica,
- i pacchetti di contesto di esecuzione,
- la continuità tra modelli LLM e tra sessioni,
- e la governance di ciò che gli agenti sono autorizzati a conoscere o utilizzare.
## Principio chiave di progettazione
```plain text
We do not need a better vector DB.
We need a better capture → consolidation → context pipeline.
```
## Componenti correlati
- Livello di recupero / acquisizione
- mem0 / servizio di memoria programmabile
- Manus / motore di consolidamento
- Obsidian / grafo canonico di Y-World
- Git / controllo delle versioni e protezione
- Pacchetti di contesto per gli agenti
- CRT / regole di instradamento ART
## Questioni aperte
- Cosa dovrebbe essere acquisito automaticamente?
- Cosa deve essere convalidato manualmente?
- Quando i ricordi dovrebbero essere uniti, sostituiti o eliminati?
- Come dovrebbero essere evidenziate le contraddizioni?
- In che modo gli agenti ricevono il contesto necessario senza essere sovraccaricati?
## Stato attuale
Pagina del progetto P0 pronta. QA GPT completato dopo la revisione di Claude.
