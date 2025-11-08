# Acceptance Criteria Checklist

1. **Layout Fidelity** — React docking grid arranges top toolbar, central canvas, bottom status, and side panels matching Swing positions when loading a campaign layout.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L431-L714】
2. **Zone Lifecycle** — Switching zones flushes prior renderer, posts deactivate/activate events, and focuses canvas without race conditions.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1700】
3. **Rendering Pipeline** — Grid, token, fog, and lighting layers execute through a single debounced frame loop with deterministic ordering.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L129-L200】
4. **Fog Visuals** — Hard fill, soft fog, and clear cutouts match MapTool’s composites using alpha and outline strokes.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】
5. **Campaign Round-Trip** — Export then import retains macros, lighting catalogs, fog flags, and landing map ID for all zones.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L41-L188】
6. **Macro & Chat** — Macro alias scopes resolve correctly and chat translations process sequential rule groups.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L45-L165】【F:src/main/java/net/rptools/maptool/client/ui/chat/ChatProcessor.java†L20-L42】
7. **Handshake Robustness** — Multiplayer connection exposes success/failure callbacks, closes sockets on error, and attaches activity monitor UI.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L115】
