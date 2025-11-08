# Non-Functional Requirements

## Performance
- Renderer ticks respect frame-rate caps derived from AppPreferences, enforcing ≤20 ms scheduling jitter.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/ZoneRenderer.java†L182-L200】
- Zone transitions clear caches and post activation events before UI focus returns.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1706】

## Reliability
- Campaign serialization maintains macro, fog, and landing-map metadata for round-trips.【F:src/main/java/net/rptools/maptool/model/Campaign.java†L41-L188】
- Connection handshake reports failure while closing sockets to avoid half-open sessions.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L56-L110】

## Security
- Handshake flow surfaces server errors to players without leaking stack traces, mirroring `MapToolConnection` safeguards.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L56-L85】
- Macro alias scope separation prevents client macros from polluting campaign namespaces.【F:src/main/java/net/rptools/maptool/client/macro/MacroManager.java†L57-L165】

## Accessibility
- Docked panels expose names and keyboard focus, matching Swing focus management when switching renderers.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1700】
- Chat translations maintain sanitized strings before rendering to avoid screen reader confusion.【F:src/main/java/net/rptools/maptool/client/ui/chat/ChatProcessor.java†L20-L42】

## Operability
- Activity monitor integration continues to surface connection throughput for debugging latency.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L88-L115】
- Fog pipeline instrumentation mirrors `CodeTimer` hooks for render-time profiling.【F:src/main/java/net/rptools/maptool/client/ui/zone/renderer/FogRenderer.java†L39-L104】
