# Connection Specification

## Interfaces
```ts
export interface SessionBridge {
  connect(options: ConnectOptions): Promise<SessionHandle>;
  disconnect(): Promise<void>;
  send(type: string, payload: unknown): void;
  onMessage(listener: MessageListener): () => void;
}
```

```ts
export interface ConnectOptions {
  url: string;
  playerId: string;
  token?: string;
}
```

## Behavior
- `connect` performs handshake and resolves when server acknowledges, mirroring `MapToolConnection.start()` callbacks.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L45-L85】
- `onMessage` registers typed handlers similar to `Connection.addMessageHandler` usage.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L88-L115】
- Bridge emits `connection:activity` events when transport surfaces throughput data.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L88-L95】

## Error Handling
- On handshake failure, reject promise, show toast, and close socket, mirroring server error logic.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L56-L80】
- If zone payload missing, publish `zone:unavailable` for UI fallback before clearing renderer.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1600-L1634】
