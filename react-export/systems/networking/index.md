# Networking

Client MapToolConnection wraps low-level Connection, handshake lifecycle, activity listeners, and protobuf send queue; model as async transport with observers.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L32-L115】

```ts
export function createClientTransport(socket){/* handshake + send */}
```

Server spins MapToolServer with Router, ServerMessageHandler, asset producer thread, and UPnP toggle; mirror via service worker hosting campaign state and asset chunking.【F:src/main/java/net/rptools/maptool/server/MapToolServer.java†L65-L126】

Connection registry maps IDs to players, tracks asset transfers, and handles disconnects; expose shared maps for session-aware sync.【F:src/main/java/net/rptools/maptool/server/MapToolServer.java†L83-L190】
