# UX Interaction Design

## Docking & Panels
- Drag/drop panes mimic MapToolDockingManager slots (chat, initiative, asset explorer) with snap targets derived from Swing layout constraints.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L431-L714】
- Keyboard focus returns to canvas after zone switch to preserve shortcuts like spacebar panning.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1700】

## Canvas Interaction
- Pointer + selection tools mapped to React pointer events; maintain selection sets and halo feedback matching SelectionModel usage.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L129-L200】
- Frame overlay portals expose measurement widgets accessible to screen readers.

## Fog Controls
- GM toggles replicate fog toolbar semantics (clear, reveal, expose) tied to Zone fog flags.【F:src/main/java/net/rptools/maptool/model/Zone.java†L817-L933】
- Animated transitions provide visual feedback when `applyFog` updates.

## Chat & Macros
- Chat input surfaces translation pipeline status and macro alias suggestions mirroring MacroManager scopes.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L57-L145】【F:src/main/java/net/rptools/maptool/client/ui/chat/ChatProcessor.java†L20-L42】
- Macro execution results display in chat log with accessible announcements.

## Multiplayer Feedback
- Connection state chip reflects handshake progress, error messaging, and reconnect prompts akin to MapToolConnection callbacks.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L85】
- Activity monitor chart renders send/receive throughput for debugging latency.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L88-L95】
