# Reverse-Engineering Roadmap

Phase 1: mirror Swing frame + renderer states into React docs (current directory). Anchor MapToolFrame orchestration and ZoneRenderer stacks before deeper specs.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L139-L714】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L81-L221】

Phase 2: expand subsystem dossiers (rendering, tokens, fog, chat, networking, scripting) capturing dependencies like FogRenderer + MacroManager.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L33-L104】【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L85-L170】

Phase 3: model infrastructure for backend server, runtime, and environment preferences to support deployment parity.【F:src/main/java/net/rptools/maptool/server/MapToolServer.java†L65-L190】【F:src/main/java/net/rptools/maptool/client/AppPreferences.java†L30-L188】

### Documentation Assets in Progress

- [Project Instructions: Macro Language & Menu System](project-instructions.md)
