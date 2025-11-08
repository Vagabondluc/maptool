# Design Decisions

Adopt CSS grid-based docking because MapToolDockingManager arranges numerous panels with persistent profiles; React layout must serialize/restore similar sets.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L633-L714】

Favor mitt event bus over heavy state manager since Swing uses MapToolEventBus + ChatNotificationTimers for loose coupling.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L309-L347】【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L455-L466】

Retain buffered rendering strategy: DebounceExecutor + FogRenderer composites prove need for throttled draws and offscreen buffers in canvas implementation.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L81-L305】【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L33-L104】
