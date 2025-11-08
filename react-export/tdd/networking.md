# Networking Design

## Session Lifecycle
1. Establish transport (WebSocket/WebRTC) and wrap with handshake controller mirroring `MapToolConnection.start()` semantics.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L85】
2. Register message handlers for zone data, chat, and activity monitor callbacks.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L88-L115】
3. On success, dispatch campaign + zone payloads to stores akin to `ClientMessageHandler` branches.【F:src/main/java/net/rptools/maptool/client/ClientMessageHandler.java†L369-L941】

## Message Bus
- Outgoing events encoded as protobuf-like envelopes with messageType; React bridge normalizes to JSON while retaining type codes for compatibility.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L112-L115】
- Activity updates streamed to UI to mirror `ActivityMonitorPanel` integration.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L88-L95】

## Error Handling
- Handshake exceptions log server detail, surface user-friendly message, then close transport.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L56-L80】
- Zone missing/visibility mismatches fall back to null renderer, matching MapToolFrame guards.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1600-L1634】

## Synchronization
- Zone activation events broadcast to ensure initiative, overlays, and selection state refresh.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1668-L1706】
- Token updates routed through selection model and update enumerations for deterministic merges.【F:src/main/java/net/rptools/maptool/model/Token.java†L166-L200】

## Reusable Fixtures
- `chatWhitespaceFixture` exported from `tests/chat.spec.ts` provides baseline chat payload for translation tests; reuse it when validating network-delivered chat packets to ensure consistent trimming semantics.
- Extend fixture set with zone and token envelopes mirroring the payload examples in `specs/connection.md` for transport-level tests.
