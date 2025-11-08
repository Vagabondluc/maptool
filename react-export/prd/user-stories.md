# User Stories

## GM — Campaign Orchestration
As a GM I load a campaign and arrange chat, initiative, and asset panes so that I can prep encounters without leaving the tabletop.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L431-L714】

### Acceptance Signals
- Docking layout persists panel placement across sessions.
- Campaign macros appear alongside toolbar and initiative data.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L71-L188】

## GM — Zone Switching
As a GM I swap maps during play while preserving fog, lighting, and player focus, so transitions feel instant.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1706】【F:src/main/java/net/rptools/maptool/model/Zone.java†L817-L933】

### Acceptance Signals
- Renderer swap fires zone activation/deactivation events.
- Fog and vision caches hydrate before players regain control.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L129-L200】

## Player — Multiplayer Entry
As a player I join a hosted session and receive the current zone state after a secure handshake so I can participate immediately.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L115】【F:src/main/java/net/rptools/maptool/client/ClientMessageHandler.java†L369-L941】

### Acceptance Signals
- Connection handshake success toggles connected UI.
- Zone payload arrives and hydrates client stores.

## Scripter — Macro Automation
As a scripter I define slash commands and aliases to automate rolls and chat output so shared macros survive campaign reloads.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L45-L165】

### Acceptance Signals
- Alias persistence matches legacy campaign exports.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L71-L188】
- Macro execution resolves to campaign or client scope.

## Player — Chat Translation
As a player I rely on translation rules to reformat chat lines, enabling custom filters and whispers without manual edits.【F:src/main/java/net/rptools/maptool/client/ui/chat/ChatProcessor.java†L20-L42】

### Acceptance Signals
- Translation groups enable/disable at runtime.
- Processed output streams to history and macro log.
