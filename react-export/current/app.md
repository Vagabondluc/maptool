# Renderer & Service Wiring

MapToolFrame swaps ZoneRenderer instances, posts ZoneLoading/Activated events, and retargets toolbars; mirror with renderer hub context and focus management.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1658-L1706】

## useRendererHub.ts
Encapsulate current zone id, focus restoration, and status updates triggered when renderer changes.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1682-L1705】

```ts
export function useRendererHub(){return useContext(RendererContext);}
```

## EventBridge.ts
Main event bus subscribes at frame construction and posts zone lifecycle events; replicate via mitt emitter bound to React effects.【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L455-L466】【F:src/main/java/net/rptools/maptool/client/ui/MapToolFrame.java†L1693-L1698】
