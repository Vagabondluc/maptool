# Browser MapTool — Product Overview

Deliver a browser-first virtual tabletop mirroring MapTool’s campaign, zone, fog, macro, and chat depth while translating Swing layout into responsive React surfaces.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L431-L1706】【F:src/main/java/net/rptools/maptool/model/Campaign.java†L41-L188】

## Objectives
- Preserve campaign + zone fidelity, including activation events, initiative wiring, and macro docks.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1661-L1706】【F:src/main/java/net/rptools/maptool/model/Campaign.java†L71-L188】
- Provide deterministic multiplayer via handshake-driven sessions and activity monitors.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L115】
- Maintain fog/lighting parity with hard+soft compositing and GM visibility overrides.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】
- Keep macro/chat automation available through alias tables and translation chains.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L45-L165】【F:src/main/java/net/rptools/maptool/client/ui/chat/ChatProcessor.java†L20-L42】

## Key Results
- Zone swap latency under 100 ms with cached assets and renderer reuse, matching current `setCurrentZoneRenderer` responsiveness.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1706】
- Renderer interactions processed within 50 ms under debounced frame caps.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L182-L200】
- Schema-compatible exports/imports with legacy campaign serialization rules.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L161-L188】
- Multiplayer handshake failures surfaced with actionable messaging parity.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L56-L85】

## Release Criteria
1. Responsive docking layout replicates toolbar/status framing and event bus registration.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L431-L1706】
2. Campaign load/save retains macros, fog flags, light catalog, and landing zone semantics.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L71-L188】
3. Network sessions negotiate handshake and dispatch activity monitors to UI.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L115】
4. Fog pipeline renders hard fill, soft overlay, and clear regions in correct order.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】
