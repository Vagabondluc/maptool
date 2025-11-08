# Services

## connectionService.ts
Mirror MapToolConnection handshake: open socket, notify observers, warn on failure, and stream protobuf payloads.【F:src/main/java/net/rptools/maptool/client/MapToolConnection.java†L32-L115】

```ts
export async function startConnection(conn,player){/* handshake + callbacks */}
```

## assetRoots.ts
Expose file picker/import workflow similar to AssetPanel.addAssetRoot and texture chooser integration.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L368-L381】【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1570-L1576】

## eventBus.ts
Wrap MapToolEventBus main bus to relay chat, zone, and preference notifications across services.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L455-L466】【F:src/main/java/net/rptools/maptool/client/ui/commandpanel/CommandPanel.java†L94-L107】
